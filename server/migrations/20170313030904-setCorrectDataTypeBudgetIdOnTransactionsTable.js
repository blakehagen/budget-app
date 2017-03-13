'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'transactions',
      'BudgetId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'budgets',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('transactions', 'BudgetId');
  }
};
