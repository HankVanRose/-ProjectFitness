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
          description: 'biba biba ibbba',
        },
        {
          planId: 1,
          points: 100,
          description: 'biba biba ibbba',
        },
        {
          planId: 1,
          points: 100,
          description: 'biba biba ibbba',
        },
        {
          planId: 1,
          points: 100,
          description: 'biba biba ibbba',
        },
        {
          planId: 1,
          points: 100,
          description: 'biba biba ibbba',
        },
        {
          planId: 1,
          points: 100,
          description: 'biba biba ibbba',
        },
        {
          planId: 1,
          points: 100,
          description: 'biba biba ibbba',
        },
        {
          planId: 1,
          points: 100,
          description: 'biba biba ibbba',
        },
        {
          planId: 1,
          points: 100,
          description: 'biba biba ibbba',
        },
        {
          planId: 1,
          points: 100,
          description: 'biba biba ibbba',
        },
        {
          planId: 1,
          points: 100,
          description: 'biba biba ibbba',
        },
        {
          planId: 1,
          points: 100,
          description: 'biba biba ibbba',
        },
        {
          planId: 2,
          points: 150,
          description: 'biba biba ibbba',
        },
        {
          planId: 3,
          points: 100,
          description: 'biba biba ibbba',
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
          exerciseId: 1,
        },
        {
          dayId: 1,
          exerciseId: 2,
        },
        {
          dayId: 1,
          exerciseId: 5,
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
