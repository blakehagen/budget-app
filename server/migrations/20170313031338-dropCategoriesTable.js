

module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.dropTable('categories');
  },

  down(queryInterface, Sequelize) {
  },
};
