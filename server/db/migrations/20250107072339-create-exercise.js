'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Exercises', {
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
      },
      shortDescription: {
        type: Sequelize.TEXT,
      },
      longDescription: {
        type: Sequelize.TEXT,
      },
      shortMuscleGroup: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      longMuscleGroup: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      equipment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      points: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      calories: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      muscleImage: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Exercises');
  },
};
