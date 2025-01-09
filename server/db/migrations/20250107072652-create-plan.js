'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shortDescription: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      slogan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      difficulty: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      weeksDuration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      numOfSessions: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      sessionsPerWeek: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      longDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      weeksDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Plans');
  },
};
