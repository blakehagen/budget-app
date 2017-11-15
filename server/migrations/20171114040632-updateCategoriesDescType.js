
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'categories',
      'description',
      {
        type: Sequelize.STRING,
      });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'categories',
      'description',
      {
        type: Sequelize.NUMERIC,
      });
  },
};
