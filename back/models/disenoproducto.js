'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DisenoProducto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DisenoProducto.init({
    id_diseno: DataTypes.BIGINT,
    id_producto: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'DisenoProducto',
    tableName: 'disenoproductos',
    timestamps: false
  });

  DisenoProducto.removeAttribute('id');

  return DisenoProducto;
};