'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('transactions', 'CategoryId', 'BudgetId');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('transactions', 'BudgetId', 'CategoryId');
  }
};
