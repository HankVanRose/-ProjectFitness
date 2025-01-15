'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Days', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      planId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Plans',
          key: 'id',
        },
      },
      points: {
        type: Sequelize.INTEGER,
      },
      calories: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      target: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rounds: {
        type: Sequelize.INTEGER,
      },
      calories: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable('Days');
  },
};
