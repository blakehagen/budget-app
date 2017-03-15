'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'budgets',
      'totalAmount',
      {
        type: Sequelize.NUMERIC,
        allowNull: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('budgets', 'totalAmount');
  }
};
