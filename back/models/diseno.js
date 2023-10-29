'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Diseno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Disenos.init({
    titulo: DataTypes.STRING,
    imagen: DataTypes.STRING,
    tema: DataTypes.STRING,
    estilo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Diseno',
    tableName: 'disenos',
  });
  return Diseno;
};