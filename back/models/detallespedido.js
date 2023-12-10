'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetallesPedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DetallesPedido.init({
    id_pedido: DataTypes.BIGINT,
    telefono: DataTypes.INTEGER,
    calle: DataTypes.STRING,
    numero: DataTypes.STRING,
    piso: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    pais: DataTypes.STRING,
    localidad: DataTypes.STRING,
    codigo_postal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DetallesPedido',
    tableName: 'detallespedidos',
    timestamps: false
  });

  DetallesPedido.removeAttribute('id');

  return DetallesPedido;
};