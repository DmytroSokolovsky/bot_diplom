const bot = require('./bot/bot');

// Обробляється помилка при опитуванні бота
bot.on('polling_error', console.log);

