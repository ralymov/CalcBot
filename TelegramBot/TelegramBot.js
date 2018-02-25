"use strict";
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

class TelegramBot {
  constructor(token = null, options = {}) {
    this.token = token;
    this.url = `https://api.telegram.org/bot${this.token}`;
    this.options = options;
    this.options.reply_markup = (typeof options.reply_markup === 'undefined') ? false : options.reply_markup;
    this.options.polling = (typeof options.polling === 'undefined') ? false : options.polling;
    this.options.webHook = (typeof options.webHook === 'undefined') ? false : options.webHook;
    
    // if (options.polling) {
    //   const autoStart = options.polling.autoStart;
    //   if (typeof autoStart === 'undefined' || autoStart === true) {
    //     this.startPolling();
    //   }
    // }
    //
    // if (options.webHook) {
    //   const autoOpen = options.webHook.autoOpen;
    //   if (typeof autoOpen === 'undefined' || autoOpen === true) {
    //     this.openWebHook();
    //   }
    // }
    
  }
  
  sendMessage(message) {
    console.log('sendMessage');
    axios.post(`${this.url}/sendMessage`, {
      chat_id: message.chat.id,
      text: '0',
      reply_markup: this.options.reply_markup,
    })
      .then(response => {
        console.log('Message posted');
      })
      .catch(error => {
        console.log('Error :', error);
      })
  }
  
  editMessage(message, text = '0') {
    console.log('editMessage');
    const chat_id = message.chat.id;
    const message_id = message.message_id;
    let new_text;
    if (text === 'AC') new_text = '0';
    else if (message.text === '0') new_text = text;
    else new_text = message.text + text;
    axios.post(`${this.url}/editMessageText`, {
      chat_id: chat_id,
      message_id: message_id,
      text: new_text,
      reply_markup: this.options.reply_markup,
    })
      .then(response => {
        console.log('Message posted');
      })
      .catch(error => {
        console.log('Error :', error);
      })
  }
  
  startPolling(offset = null) {
    axios.post(`https://api.telegram.org/bot${this.token}/getUpdates`,
      {
        timeout: 30000,
        offset: offset,
        limit: 1,
      })
      .then(response => {
        if (response.data.result[0]) {
          offset = response.data.result[0].update_id + 1;
          const {callback_query, message} = response.data.result[0];
          if (callback_query) {
            this.editMessage(callback_query.message, callback_query.data);
          }
          if (message) {
            this.sendMessage(message);
          }
        }
      })
      .catch(error => console.log(error))
      .then(() => {
        this.startPolling(offset);
      });
  }
  
  
  openWebHook() {
    app.post('/new-message', function (req, res) {
      const {callback_query, message} = req.body;
      console.log(req.body);
      if (callback_query) {
        this.editMessage(callback_query.message, callback_query.data);
        res.end('ok');
      }
      if (message) {
        this.sendMessage(message);
        res.end('ok');
      }
    });
  }
  
  startBot() {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    const bot = this;
    
    app.listen(process.env.PORT || 3000, function () {
      console.log('Telegram app listening on port 3000!');
      
      if (bot.options.polling) {
        bot.startPolling();
      }
      
      if (bot.options.webHook) {
        app.post('/new-message', function (req, res) {
          const {callback_query, message} = req.body;
          console.log(req.body);
          console.log('callback_query: ' + callback_query);
          console.log('message: ' + message);
          if (callback_query) {
            bot.editMessage(callback_query.message, callback_query.data);
            res.end('ok');
          } else if (message) {
            bot.sendMessage(message);
            res.end('ok');
          } else {
            res.end('ok');
          }
        });
      }
      
    });
  }
  
}

module.exports = TelegramBot;
