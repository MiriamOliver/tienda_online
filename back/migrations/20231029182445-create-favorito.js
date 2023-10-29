'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('favoritos', {
      id_user: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      id_diseno: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('favoritos');
  }
};