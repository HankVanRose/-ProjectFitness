'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'PlanExercises',
      [
        {
          planId: 1,
          exerciseId: 1,
        },
        {
          planId: 1,
          exerciseId: 2,
        },
        {
          planId: 1,
          exerciseId: 5,
        },
        {
          planId: 1,
          exerciseId: 8,
        },
        {
          planId: 1,
          exerciseId: 11,
        },
        {
          planId: 1,
          exerciseId: 18,
        },
        {
          planId: 1,
          exerciseId: 19,
        },
        {
          planId: 1,
          exerciseId: 23,
        },
        {
          planId: 1,
          exerciseId: 25,
        },
        {
          planId: 1,
          exerciseId: 28,
        },
        {
          planId: 1,
          exerciseId: 30,
        },
        {
          planId: 1,
          exerciseId: 33,
        },
        {
          planId: 1,
          exerciseId: 21,
        },

        {
          planId: 2,
          exerciseId: 20,
        },
        {
          planId: 2,
          exerciseId: 26,
        },
        {
          planId: 2,
          exerciseId: 29,
        },
        {
          planId: 2,
          exerciseId: 7,
        },
        {
          planId: 2,
          exerciseId: 10,
        },
        {
          planId: 2,
          exerciseId: 6,
        },
        {
          planId: 2,
          exerciseId: 12,
        },
        {
          planId: 2,
          exerciseId: 14,
        },
        {
          planId: 2,
          exerciseId: 14,
        },
        {
          planId: 2,
          exerciseId: 19,
        },
        {
          planId: 2,
          exerciseId: 25,
        },
        {
          planId: 4,
          exerciseId: 3,
        },
        {
          planId: 4,
          exerciseId: 4,
        },
        {
          planId: 4,
          exerciseId: 2,
        },
        {
          planId: 4,
          exerciseId: 9,
        },
        {
          planId: 4,
          exerciseId: 13,
        },
        {
          planId: 4,
          exerciseId: 17,
        },
        {
          planId: 4,
          exerciseId: 27,
        },
        {
          planId: 4,
          exerciseId: 1,
        },
        {
          planId: 4,
          exerciseId: 1,
        },
        {
          planId: 3,
          exerciseId: 27,
        },
        {
          planId: 3,
          exerciseId: 19,
        },
        {
          planId: 3,
          exerciseId: 25,
        },
        {
          planId: 3,
          exerciseId: 26,
        },
        {
          planId: 3,
          exerciseId: 30,
        },
        {
          planId: 3,
          exerciseId: 32,
        },
        {
          planId: 3,
          exerciseId: 33,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
