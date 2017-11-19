
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'budgets',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.STRING,
        },
        recurring: {
          type: Sequelize.BOOLEAN,
        },
        createdDateHumanized: {
          type: Sequelize.STRING,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('budgets');
  },
};
