'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlanExercise extends Model {

    static associate(models) {
    }
  }
  PlanExercise.init({
    planId: DataTypes.INTEGER,
    exerciseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlanExercise',
  });
  return PlanExercise;
};