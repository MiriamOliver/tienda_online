'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DisenosArtistas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DisenosArtistas.init({
    id_user: DataTypes.BIGINT,
    id_diseno: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'DisenosArtistas',
    tableName: 'disenosartistas',
    timestamps: false
  });

  DisenosArtistas.removeAttribute('id');

  return DisenosArtistas;
};