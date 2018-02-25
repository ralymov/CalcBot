const TelegramBot = require('./TelegramBot.js');

class TelegramBotLongPolling extends TelegramBot {
  constructor(token = null, options = {}) {
    super();
  }
}

module.exports = TelegramBotLongPolling;
