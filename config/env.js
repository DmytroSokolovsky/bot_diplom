// Завантаження змінних середовища з .env файлу
require('dotenv').config();

module.exports = {
  // Експорт токена бота з змінної середовища, URL веб-додатку та URL API для взаємодії з бекендом
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  // WEB_APP_URL: 'https://dmytrosokolovsky.github.io/react_diplom/#/',
  WEB_APP_URL: 'https://next-diplom.vercel.app/',
  API_URL: "https://api-diplom-eupy.onrender.com/api/",
};
