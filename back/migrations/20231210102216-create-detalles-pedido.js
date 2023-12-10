'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detallespedidos', {
      id_pedido: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      telefono: {
        type: Sequelize.INTEGER
      },
      calle: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.STRING
      },
      piso: {
        type: Sequelize.STRING
      },
      ciudad: {
        type: Sequelize.STRING
      },
      pais: {
        type: Sequelize.STRING
      },
      localidad: {
        type: Sequelize.STRING
      },
      codigo_postal: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detallespedidos');
  }
};