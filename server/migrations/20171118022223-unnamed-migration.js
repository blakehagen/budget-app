
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.renameColumn(
      'budgets',
      'UserId',
      'CreatedByUserId',
      {
        type: Sequelize.STRING,
      });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.renameColumn('description', 'CreatedByUserId', 'UserId');
  },
};
