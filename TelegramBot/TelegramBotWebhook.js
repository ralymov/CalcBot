const TelegramBot = require('./TelegramBot.js');

class TelegramBotWebhook extends TelegramBot {
  constructor(token = null, options = {}) {
    super();
  }
}

module.exports = TelegramBotWebhook;
