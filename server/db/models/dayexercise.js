'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DayExercise extends Model {
    static associate(models) {}
  }
  DayExercise.init(
    {
      dayId: DataTypes.INTEGER,
      exerciseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'DayExercise',
    }
  );
  return DayExercise;
};
