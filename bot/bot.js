// Імпорт необіхідних модулів і бібліотек
const TelegramBot = require('node-telegram-bot-api');
const { TELEGRAM_BOT_TOKEN } = require('../config/env'); 
const { handleMessage } = require('./handlers/messageHandler'); 
const { handleCallbackQuery } = require('./handlers/callbackQueryHandler'); 

// Ініціалізація бота з токеном і режимом опитування
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Обробка вхідних повідомлень
bot.on('message', (msg) => handleMessage(bot, msg));
// Обробка запитів з клавіатури
bot.on('callback_query', (callbackQuery) => handleCallbackQuery(bot, callbackQuery));

// Експорт об'єкту бота для використання в інших модулях
module.exports = bot; 
