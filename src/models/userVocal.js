'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Vocal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User_Vocal.init({
    userId: DataTypes.INTEGER,
    vocalId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User_Vocal',
  });
  return User_Vocal;
};