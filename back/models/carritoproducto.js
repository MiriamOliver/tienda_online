'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CarritoProducto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CarritoProducto.init({
    id_user: DataTypes.BIGINT,
    id_carrito: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'CarritoProducto',
    tableName: 'carritosproductos',
  });

  CarritoProducto.removeAttribute('id');

  return CarritoProducto;
};