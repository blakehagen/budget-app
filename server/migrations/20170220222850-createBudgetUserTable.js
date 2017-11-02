

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'budgets_users',
      {
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
        UserId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
      },
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('budgets_users');
  },
};
