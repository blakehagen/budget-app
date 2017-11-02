

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('transactions', 'date', 'postedDateHumanized');
  },

  down(queryInterface, Sequelize) {
    return queryInterface.renameColumn('transactions', 'postedDateHumanized', 'date');
  },
};
