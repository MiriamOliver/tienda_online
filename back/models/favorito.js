'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favorito.init({
    id_user: DataTypes.BIGINT,
    id_diseno: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Favorito',
    tableName: 'favoritos'
  });

  Favorito.removeAttribute('id');

  return Favorito;
};