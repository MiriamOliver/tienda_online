'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tiposproductos', {
      id_producto: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      id_tipo: {
        type: Sequelize.BIGINT,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tiposproductos');
  }
};