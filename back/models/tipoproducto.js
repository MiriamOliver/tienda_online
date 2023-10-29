'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoProducto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TipoProducto.init({
    id_producto: DataTypes.BIGINT,
    id_tipo: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'TipoProducto',
    tableName: 'tiposproductos'
  });
  
  TipoProducto.removeAttribute('id');

  return TipoProducto;
};