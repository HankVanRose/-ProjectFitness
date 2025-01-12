'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Day extends Model {
    static associate(models) {
      this.belongsTo(models.Plan, { foreignKey: 'planId' });
      this.belongsToMany(models.Exercise, {
        through: 'DayExercises',
        foreignKey: 'dayId',
        otherKey: 'exerciseId',
      });
      this.hasMany(models.UserDay, { foreignKey: 'dayId' });
    }
  }
  Day.init(
    {
      planId: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      
    },
    {
      sequelize,
      modelName: 'Day',
    }
  );
  return Day;
};
