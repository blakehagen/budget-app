

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.renameColumn('budgets', 'UserId', 'CreatedByUserId');
  },

  down(queryInterface, Sequelize) {
    return queryInterface.renameColumn('budgets', 'CreatedByUserId', 'UserId');
  },
};
