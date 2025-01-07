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
          avatar: 'https://bit.ly/sage-adebayo',
          gender: 'male',
          age: 22,
          height: 178,
          weight: 90,
          points: 10,
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
