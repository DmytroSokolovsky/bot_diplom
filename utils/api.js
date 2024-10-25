// Імпорт необіхідних модулів і бібліотек
const axios = require('axios');
const { API_URL } = require('../config/env');

// Функція отримує доступні дати для лікаря за userId
const fetchAvailableDates = (userId) => axios.get(`${API_URL}doctor/${userId}/available-dates`);

// Функція отримує записи за обрану дату для лікаря за userId
const fetchRecordsByDate = (userId, date) => axios.get(`${API_URL}doctor/${userId}/records/${date}`);

// Експортуються функції для використання в інших модулях
module.exports = { fetchAvailableDates, fetchRecordsByDate };
