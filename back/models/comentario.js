'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comentario.init({
    id_user: DataTypes.BIGINT,
    id_producto: DataTypes.BIGINT,
    comentario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comentario',
    tableName: 'comentarios',
  });

  Comentario.removeAttribute('id');

  return Comentario;
};