
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'transactions',
      'description',
      {
        type: Sequelize.STRING,
      });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'description',
      {
        type: Sequelize.NUMERIC,
      });
  },
};
