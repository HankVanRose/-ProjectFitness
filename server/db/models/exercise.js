'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate(models) {
      this.belongsToMany(models.Plan, { through: 'PlanExercises' } );
    }
  }
  Exercise.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      muscleGroup: DataTypes.STRING,
      type: DataTypes.STRING,
      equipment: DataTypes.STRING,
      points: DataTypes.INTEGER,
      calories: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Exercise',
    }
  );
  return Exercise;
};
