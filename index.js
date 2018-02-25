"use strict";
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const TelegramBot = require('./TelegramBot/TelegramBot.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const token = process.env.TELEGRAM_TOKEN;
const options = {
  reply_markup: {
    inline_keyboard: [
      [{text: 'AC', callback_data: 'AC'}, {text: '+', callback_data: '+'}, {text: '-', callback_data: '-'}],
      [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
      [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
      [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
      [{text: '0', callback_data: '0'}]
    ],
  }
};
let TelegramBotTest = new TelegramBot(token, options);

app.listen(process.env.PORT || 5000, function () {
  console.log('Telegram app listening on port 5000!');
  poll();
});

function poll(offset = null) {
  axios.post(`https://api.telegram.org/bot${token}/getUpdates`,
    {
      timeout: 30000,
      offset: offset,
      limit: 1,
    })
    .then(response => {
      offset = response.data.result[0].update_id + 1;
      const {callback_query, message} = response.data.result[0];
      if (callback_query) {
        TelegramBotTest.editMessage(callback_query.message, callback_query.data);
      }
      if (message) {
        TelegramBotTest.sendMessage(message);
      }
    })
    .catch(error => console.log(error))
    .then(() => {
      poll(offset);
    })
}