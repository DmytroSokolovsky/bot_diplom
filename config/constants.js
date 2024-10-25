module.exports = {
  START_MESSAGE: `
Привіт! 👋

Я – Ваш помічник для запису на прийом до лікаря 🏥

Натиснувши кнопку "Для пацієнтів" нижче Ви можете:
- 👩‍⚕️ Переглянути інформацію про лікарів нашої клініки
- 📅 Записатися на прийом
- 📝 Переглянути ваші записи
- ❌ Скасувати запис

Команди чат-бота для лікарів нашої клініки: 
👉 /schedule - перегляд записів до Вас
  `,

  // Повідомлення про успішний запис для пацієнта
  SUCCESFULL_RECORD_MESSAGE_FOR_PATIENT: (data) => `
✍️ Ви записані на прийом:

👨‍⚕️ Лікар: ${data.doctor}
🩺 Спеціалізація: ${data.specialization}
📅 Дата: ${data.date}
⏰ Час: ${data.time}
  `,

  // Повідомлення про новий запис для лікаря
  SUCCESFULL_RECORD_MESSAGE_FOR_DOCTOR: (data) => `
✍️ У вас новий запис на прийом:

👨‍🦱 Пацієнт: ${data.patient_name}
📞 Номер телефону: ${data.patient_phone_number}
📅 Дата: ${data.date}
⏰ Час: ${data.time}
  `,

  // Повідомлення про скасування запису для пацієнта
  DELETED_RECORD_MESSAGE_FOR_PATIENT: (data) => `
❎ Запис успішно скасовано:

👨‍⚕️ Лікар: ${data.deletedDoctor}
🩺 Спеціалізація: ${data.deletedSpecialization}
📅 Дата: ${data.deletedRecordDate}
⏰ Час: ${data.deletedRecordTime}
  `,

  // Повідомлення про скасування запису для лікаря
  DELETED_RECORD_MESSAGE_FOR_DOCTOR: (data) => `
❗️ Пацієнт скасував запис:

👨‍🦱 Пацієнт: ${data.deletedPatientName}
📞 Номер телефону: ${data.deletedPatientPhoneNumber}
📅 Дата: ${data.deletedRecordDate}
⏰ Час: ${data.deletedRecordTime}
  `,

  // Запрошення для вибору дати
  DATE_PROMPT: '👇 Оберіть дату:',

  // Повідомлення про помилку
  ERROR_MESSAGE: '❌ Виникла помилка. Спробуйте пізніше',

  // Повідомлення для невизначеного лікаря
  NOT_A_DOCTOR: '❌ Ви не є лікарем або виникла помилка',

  // Заголовок для повідомлення про запис до лікаря
  DOCTOR_DATE_SCHEDULE_MESSAGE_TITLE: (data) => `👇 Записи до Вас на ${data}:\n`,

  // Тіло повідомлення про запис до лікаря
  DOCTOR_DATE_SCHEDULE_MESSAGE_BODY: (data) => `
👨‍🦱 Пацієнт: ${data.patient_name}
📞 Номер телефону: ${data.patient_phone_number}
📅 Дата: ${data.date}
⏰ Час: ${data.time}
  `,
};

