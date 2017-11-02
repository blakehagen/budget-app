

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'budgets',
      'totalAmount',
      {
        type: Sequelize.NUMERIC,
        allowNull: true,
      },
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('budgets', 'totalAmount');
  },
};
