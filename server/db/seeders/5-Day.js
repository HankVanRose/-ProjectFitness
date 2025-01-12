'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Days',
      [
        {
          planId: 1,
          points: 100,
          description:
            'Выполнить 3 раунда за минимальное время:; 3 Выхода на кольца; 6 Взятий на грудь + толчок 60 кг; 9 Подтягиваний; 12 Берпи; 15 Приседаний 60 кг; 18 Отжиманий; 21 Махи гири 24кг; 24 V-up',
        },
        {
          planId: 1,
          points: 120,
          description: 'Задача: Закончить задание за минимальное время:; Выполнить: 10 раундов:; 10-9-8-7-6-5-4-3-2-1:; Выбросы одной гири двумя руками, 32/24 кг; Махи гирей двумя руками, 32/24 кг; Тяга гири с пола к подбородку, 32/24 кг; Тяга гири в наклоне, 32/24 кг; Становая тяга с гирей, 32/24 кг;',
        },
        {
          planId: 1,
          points: 130,
          description: 'Задача: Закончить задание за минимальное время:; Выполнить: 7 раундов:; Задание:; 7 отжиманий в стойке на руках:; 7 выбросов штанги, 60 кг:; 7 коленей к локтям на турнике;; 7 становых тяг, 110 кг:; 7 берпи:; 7 махов гирей, 24 кг:; 7 подтягиваний на турнике;',
        },
        {
          planId: 1,
          points: 150,
          description: 'Задача: Закончить задание за минимальное время:; Выполнить: 1 раунд:; Задание:; 50 двойных прыжков на скакалке:; 10 прыжков на тумбу:; 40 двойных прыжков на скакалке:; 20 прыжков на тумбу:; 30 двойных прыжков на скакалке:; 40 прыжков на тумбу:; 10 двойных прыжков на скакалке:; 50 прыжков на тумбу:; ',
        },
        {
          planId: 1,
          points: 100,
          description: 'Задача: Закончить задание за минимальное время:; Выполнить: 3 раунда:; Задание:; 21-15-9:; Подтягивания на турнике:; Отжимания от пола:; Подъем ног в висе к перекладине:; Гоблет приседания:;',
        },
        {
          planId: 1,
          points: 100,
          description: 'Задача: Завершить как можно больше раундов за 20 минут (AMRAP 20 min):; Задание:; 8 подъемов ног носками к турнику:; 10 взятий с виса и толчков гантели 22,5 / 15 кг:; 14/12 калорий гребли:;',
        },
        {
          planId: 1,
          points: 100,
          description: '7',
        },
        {
          planId: 1,
          points: 100,
          description: '8',
        },
        {
          planId: 1,
          points: 100,
          description: '9',
        },
        {
          planId: 1,
          points: 100,
          description: '10',
        },
        {
          planId: 1,
          points: 100,
          description: '11',
        },
        {
          planId: 1,
          points: 100,
          description: '12',
        },
       
        {
          planId: 2,
          points: 150,
          description: '5',
        },
        {
          planId: 3,
          points: 100,
          description: '5',
        },
        {
          planId: 4,
          points: 150,
          description: 'biba biba ibbba',
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'DayExercises',
      [
        // Day 1 exercises
        {
          dayId: 1,
          exerciseId: 34,
        },
        {
          dayId: 1,
          exerciseId: 36,
        },
        {
          dayId: 1,
          exerciseId: 35,
        },
        {
          dayId: 1,
          exerciseId: 10,
        },
        {
          dayId: 1,
          exerciseId: 1,
        },
        {
          dayId: 1,
          exerciseId: 37,
        },
        {
          dayId: 1,
          exerciseId: 6,
        },
        {
          dayId: 1,
          exerciseId: 38,
        },
        {
          dayId: 1,
          exerciseId: 39,
        },
        // Day 2 exercises
        {
          dayId: 2,
          exerciseId: 8,
        },
        {
          dayId: 2,
          exerciseId: 11,
        },
        {
          dayId: 2,
          exerciseId: 18,
        },
        // Day 3 exercises
        {
          dayId: 3,
          exerciseId: 19,
        },
        {
          dayId: 3,
          exerciseId: 23,
        },
        {
          dayId: 3,
          exerciseId: 25,
        },
        // Day 4 exercises
        {
          dayId: 4,
          exerciseId: 28,
        },
        {
          dayId: 4,
          exerciseId: 30,
        },
        {
          dayId: 4,
          exerciseId: 33,
        },
        // Day 5 exercises
        {
          dayId: 5,
          exerciseId: 20,
        },
        {
          dayId: 5,
          exerciseId: 26,
        },
        {
          dayId: 5,
          exerciseId: 29,
        },
        // Days for plan 6
        {
          dayId: 6,
          exerciseId: 3,
        },
        {
          dayId: 6,
          exerciseId: 4,
        },
        {
          dayId: 6,
          exerciseId: 2,
        },
        // Days for plan 7
        {
          dayId: 7,
          exerciseId: 9,
        },
        {
          dayId: 7,
          exerciseId: 13,
        },
        {
          dayId: 7,
          exerciseId: 17,
        },
        // Days for plan 8
        {
          dayId: 8,
          exerciseId: 11,
        },
        {
          dayId: 8,
          exerciseId: 12,
        },
        {
          dayId: 8,
          exerciseId: 13,
        },
        // Days for plan 9
        {
          dayId: 9,
          exerciseId: 22,
        },
        {
          dayId: 9,
          exerciseId: 23,
        },
        {
          dayId: 9,
          exerciseId: 32,
        },
        // Days for plan 10
        {
          dayId: 10,
          exerciseId: 24,
        },
        {
          dayId: 10,
          exerciseId: 12,
        },
        {
          dayId: 10,
          exerciseId: 1,
        },
        // Days for plan 11
        {
          dayId: 11,
          exerciseId: 3,
        },
        {
          dayId: 11,
          exerciseId: 2,
        },
        {
          dayId: 11,
          exerciseId: 14,
        },
        // Days for plan 12
        {
          dayId: 12,
          exerciseId: 4,
        },
        {
          dayId: 12,
          exerciseId: 5,
        },
        {
          dayId: 12,
          exerciseId: 6,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DayExercises', null, {});
    await queryInterface.bulkDelete('Days', null, {});
  },
};
