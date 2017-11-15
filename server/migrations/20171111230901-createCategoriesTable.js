
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'categories',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
        },
        limit: {
          type: Sequelize.NUMERIC,
        },
        BudgetId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'budgets',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        description: {
          type: Sequelize.NUMERIC,
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
    return queryInterface.dropTable('categories');
  },
};
