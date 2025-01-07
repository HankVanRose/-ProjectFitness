'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    static associate(models) {
      this.belongsToMany(models.Exercise, { through: 'PlanExercises' });
      this.hasMany(models.Session, { foreignKey: 'planId' });
    }
  }
  Plan.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      equipment: DataTypes.STRING,
      difficulty: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Plan',
    }
  );
  return Plan;
};
