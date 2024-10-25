// Імпорт необіхідних модулів і бібліотек
const { WEB_APP_URL } = require('../config/env');

// Функція отримує URL веб-додатку з параметром user_id
const getWebAppUrlWithUserId = (userId) => `${WEB_APP_URL}?user_id=${userId}`;

// Експортується функція для використання в інших модулях
module.exports = { getWebAppUrlWithUserId };

