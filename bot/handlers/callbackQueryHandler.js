// Імпорт необіхідних модулів і бібліотек
const { fetchRecordsByDate } = require('../../utils/api');
const { ERROR_MESSAGE, DOCTOR_DATE_SCHEDULE_MESSAGE_BODY, DOCTOR_DATE_SCHEDULE_MESSAGE_TITLE } = require('../../config/constants');

// Обробка запитів з клавіатури
const handleCallbackQuery = async (bot, callbackQuery) => {
  const chatId = callbackQuery.message.chat.id; // Отримання ID чату
  const selectedDate = callbackQuery.data; // Отримання вибраної дати
  const userId = callbackQuery.from.id; // Отримання ID користувача

  try {
    // Отримання записів за вибраною датою
    const recordsResponse = await fetchRecordsByDate(userId, selectedDate);
    const records = recordsResponse.data; // Збереження отриманих записів

    // Формування повідомлення з заголовком
    let message = DOCTOR_DATE_SCHEDULE_MESSAGE_TITLE(selectedDate);

    // Додавання записів до повідомлення
    records.forEach(record => {
      message += DOCTOR_DATE_SCHEDULE_MESSAGE_BODY(record);
    });

    // Відправлення повідомлення з розкладом
    await bot.sendMessage(chatId, message);
  } catch (error) {
    // Відправлення повідомлення про помилку
    await bot.sendMessage(chatId, ERROR_MESSAGE);
  }
};

// Експорт функції для використання в інших модулях
module.exports = { handleCallbackQuery };
