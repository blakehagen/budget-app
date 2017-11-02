

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'transactions',
      'postedDateHumanized',
      {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('transactions', 'postedDateHumanized');
  },
};
