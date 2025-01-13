const { Day } = require('../db/models');

// Перед сохранением дня вычисляем dayNumber
Day.beforeCreate(async (day) => {
  const maxDayNumber = await Day.max('dayNumber', {
    where: { planId: day.planId },
  });
  day.dayNumber = (maxDayNumber || 0) + 1; // Если дней еще нет, начинаем с 1
});