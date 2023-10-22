'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolesAsignados extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RolesAsignados.belongsTo(models.Rol, {
        foreignKey: 'id_rol',
        targetKey: 'id',
        as: 'Rol'
      });
    }
  }
  RolesAsignados.init({
    id_user: DataTypes.BIGINT,
    id_rol: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'RolesAsignados',
    tableName: 'rolesasignados',
    timestamps: false
  });

  RolesAsignados.removeAttribute('id');
  
  return RolesAsignados;
};