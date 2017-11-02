

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'budgets',
      'createdDateHumanized',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('budgets', 'createdDateHumanized');
  },
};
