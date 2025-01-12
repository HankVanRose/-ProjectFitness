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
          points: 100,
          description: '2',
        },
        {
          planId: 1,
          points: 100,
          description: '3',
        },
        {
          planId: 1,
          points: 100,
          description: '4',
        },
        {
          planId: 1,
          points: 100,
          description: '5',
        },
        {
          planId: 1,
          points: 100,
          description: '6',
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
