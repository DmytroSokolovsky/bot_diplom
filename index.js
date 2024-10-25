require('dotenv').config();

const bot = require('./bot/bot');

const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();

// Обробляється помилка при опитуванні бота
bot.on('polling_error', console.log);

app.listen(PORT, () => {
  console.log(`Бот запущений на порту ${PORT}`);
});