// Імпорт необіхідних модулів і бібліотек
const { fetchAvailableDates } = require('../../utils/api');
const { getWebAppUrlWithUserId } = require('../../utils/telegram');
const { START_MESSAGE, DATE_PROMPT, NOT_A_DOCTOR, SUCCESFULL_RECORD_MESSAGE_FOR_PATIENT, SUCCESFULL_RECORD_MESSAGE_FOR_DOCTOR, DELETED_RECORD_MESSAGE_FOR_PATIENT, DELETED_RECORD_MESSAGE_FOR_DOCTOR, ERROR_MESSAGE } = require('../../config/constants');

// Обробка вхідних повідомлень
const handleMessage = async (bot, msg) => {
  const chatId = msg.chat.id; // Отримання ID чату
  const text = msg.text; // Отримання тексту повідомлення
  const userId = msg.from.id; // Отримання ID користувача

  // Обробка команди /start
  if (text === '/start') {
    await bot.sendMessage(chatId, START_MESSAGE, {
      reply_markup: {
        keyboard: [[{ text: 'Для пацієнтів', web_app: { url: getWebAppUrlWithUserId(userId) } }]] // Кнопка для пацієнтів
      }
    });
  }
  
  // Обробка команди /schedule
  if (text === '/schedule') {
    try {
      const datesResponse = await fetchAvailableDates(userId); // Отримання доступних дат
      const availableDates = datesResponse.data; // Збереження доступних дат
  
      // Створення об'єкту дати для сьогодні
      const today = new Date();
      today.setHours(0, 0, 0, 0);  

      // Створення об'єкту дати на місяць вперед
      const monthAhead = new Date(today);
      monthAhead.setMonth(today.getMonth() + 1);

      // Функція для парсингу дати з рядка
      const parseDate = (dateStr) => {
        // Розділення дати на день і місяць
        const [day, month] = dateStr.split('.').map(Number);

        // Створення об'єкту дати
        const date = new Date(today.getFullYear(), month - 1, day);
        date.setHours(0, 0, 0, 0);  
        return date;
      };
  
      // Фільтрація доступних дат
      const filteredDates = availableDates.filter(date => {
        // Парсинг дати
        const recordDate = parseDate(date);

        // Перевірка, чи дата в межах
        return recordDate >= today && recordDate <= monthAhead;
      });
  
      // Сортування дат
      filteredDates.sort((a, b) => {
        const dateA = parseDate(a);
        const dateB = parseDate(b);

        // Сортування від старої до нової
        return dateA - dateB;
      });
  
      // Перевірка наявності доступних дат
      if (filteredDates.length === 0) {
        // Повідомлення, якщо дат немає
        await bot.sendMessage(chatId, 'Немає доступних дат.');
        return;
      }
  
      // Формування клавіатури для вибору дати
      const dateKeyboard = filteredDates.map(date => [{ text: date, callback_data: date }]);
  
      // Відправлення запиту на вибір дати
      await bot.sendMessage(chatId, DATE_PROMPT, {
        // Клавіатура з доступними датами
        reply_markup: { inline_keyboard: dateKeyboard }, 
      });
    } catch (error) {
      // Повідомлення про помилку
      await bot.sendMessage(chatId, NOT_A_DOCTOR); 
    }
  }
  
  // Обробка даних з веб-додатку
  if(msg?.web_app_data?.data) {
    try {
      // Парсинг даних з веб-додатку
      const data = JSON.parse(msg?.web_app_data?.data) 
      
      // Перевірка наявності даних для запису
      if (data.doctor || data.specialization || data.date || data.time || data.user_id || data.patient_name || data.patient_phone_number) {
        // Повідомлення пацієнту про успішний запис
        await bot.sendMessage(chatId, SUCCESFULL_RECORD_MESSAGE_FOR_PATIENT(data)) 
      }

      // Перевірка наявності даних для видалення запису
      if (data.deletedDoctor || data.deletedSpecialization || data.deletedPatientName || data.deletedPatientPhoneNumber || data.deletedRecordDate || data.deletedRecordTime) {
        // Повідомлення про видалення запису
        await bot.sendMessage(chatId, DELETED_RECORD_MESSAGE_FOR_PATIENT(data)) 
      }

      // Перевірка наявності ID лікаря для сповіщення
      if (data.doctor_id || data.deletedDoctorTelegramId) {
        if (data.doctor_id) {
          // Повідомлення лікарю про успішний запис
          await bot.sendMessage(data.doctor_id, SUCCESFULL_RECORD_MESSAGE_FOR_DOCTOR(data)) 
        } else if (data.deletedDoctorTelegramId) {
          // Повідомлення лікарю про видалення запису
          await bot.sendMessage(data.deletedDoctorTelegramId, DELETED_RECORD_MESSAGE_FOR_DOCTOR(data)) 
        } else {
          return
        }
      }
    } catch(error) {
      // Обробка помилки парсингу даних
    }
  }
};

// Експорт функції для використання в інших модулях
module.exports = { handleMessage };
