'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDay extends Model {

    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Day, { foreignKey: 'dayId' });
    }
  }
  UserDay.init(
    {
      userId: DataTypes.INTEGER,
      dayId: DataTypes.INTEGER,
      isCompleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'UserDay',
    }
  );
  return UserDay;
};
