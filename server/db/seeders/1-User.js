'use strict';
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'John Doe',
          email: 'scott@ya.ru',
          password: await bcrypt.hash('11111111', 10),
          avatar: '../../public/photo_2024-12-13_17-44-34.jpg',
          gender: 'male',
          age: 22,
          height: '178',
          weight: '90',
          points: 10,
          calories: 0,
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
