'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Plan, { foreignKey: 'planId' });
    }
  }
  Session.init(
    {
      planId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      isCompleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Session',
    }
  );
  return Session;
};
