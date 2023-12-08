'use strict';
const {
  Model, INET
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
  Diseno.init({
    titulo: DataTypes.STRING,
    imagen: DataTypes.STRING,
    tema: DataTypes.STRING,
    estilo: DataTypes.STRING,
    descripcion:DataTypes.STRING,
    activado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Diseno',
    tableName: 'disenos',
  });
  return Diseno;
};