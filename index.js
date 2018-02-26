"use strict";
require('dotenv').config();
const TelegramBot = require('./TelegramBot/TelegramBot.js');

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
  },
  webHook: {
    url: 'https://murmuring-eyrie-76459.herokuapp.com',
    method: /new_message',
  },
  // polling: true,
};
const TelegramBotTest = new TelegramBot(token, options);
TelegramBotTest.startBot();
