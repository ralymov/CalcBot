"use strict";
const axios = require('axios');

class TelegramBot {
  constructor(token = null, options = {}) {
    this.token = token;
    this.url = `https://api.telegram.org/bot${this.token}`;
    this.options = options;
    this.options.reply_markup = (typeof options.reply_markup === 'undefined') ? false : options.reply_markup;
  }
  
  sendMessage(message) {
    axios.post(`${this.url}/sendMessage`, {
      chat_id: message.chat.id,
      text: '0',
      reply_markup: this.options.reply_markup,
    })
  }
  
  editMessage(message, text = '0') {
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
  }
}

module.exports = TelegramBot;
