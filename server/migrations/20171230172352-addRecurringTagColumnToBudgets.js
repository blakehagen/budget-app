
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'budgets',
      'monthYear',
      {
        type: Sequelize.STRING,
      });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('budgets', 'monthYear');
  },
};
