

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('transactions', 'CategoryId', 'BudgetId');
  },

  down(queryInterface, Sequelize) {
    return queryInterface.renameColumn('transactions', 'BudgetId', 'CategoryId');
  },
};
