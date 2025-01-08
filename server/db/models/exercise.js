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
      image: DataTypes.STRING,
      shortDescription: DataTypes.TEXT,
      longDescription: DataTypes.TEXT,
      shortMuscleGroup: DataTypes.STRING,
      longMuscleGroup: DataTypes.TEXT,
      type: DataTypes.STRING,
      equipment: DataTypes.STRING,
      points: DataTypes.STRING,
      calories: DataTypes.STRING,
      muscleImage: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Exercise',
    }
  );
  return Exercise;
};
