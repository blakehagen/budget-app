'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.dropTable('categories');
  },

  down: function (queryInterface, Sequelize) {
  }
};
