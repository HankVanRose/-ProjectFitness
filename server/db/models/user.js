'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      this.hasMany(models.Session, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      gender: DataTypes.STRING,
      age: DataTypes.INTEGER,
      height: DataTypes.STRING,
      weight: DataTypes.STRING,
      points: DataTypes.INTEGER,
      calories: DataTypes.INTEGER,
      goal: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};