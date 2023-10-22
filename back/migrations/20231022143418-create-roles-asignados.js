'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rolesasignados', {
      id_user: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      id_rol: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('rolesasignados');
  }
};