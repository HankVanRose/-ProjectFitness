'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate(models) {
      // this.belongsToMany(models.Plan, {
      //   through: 'PlanExercises',
      //   foreignKey: 'exerciseId',
      //   otherKey: 'planId',
      // });
      this.belongsToMany(models.Day, {
        through: 'DayExercises',
        foreignKey: 'exerciseId',
        otherKey: 'dayId',
      });
    }
  }
  Exercise.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      shortDescription: DataTypes.TEXT,
      longDescription: DataTypes.TEXT,
      shortMuscleGroup: DataTypes.STRING,
      longMuscleGroup: DataTypes.TEXT,
      type: DataTypes.STRING,
      equipment: DataTypes.STRING,
      points: DataTypes.INTEGER,
      calories: DataTypes.INTEGER,
      muscleImage: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Exercise',
    }
  );
  return Exercise;
};
