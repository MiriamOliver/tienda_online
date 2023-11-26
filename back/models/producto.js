'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Producto.init({
    titulo: DataTypes.STRING,
    imagen: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    activado: DataTypes.INTEGER,
    precio: DataTypes.FLOAT,
    estado: DataTypes.STRING,
    id_tipo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Producto',
    tableName:'productos'
  });
  return Producto;
};