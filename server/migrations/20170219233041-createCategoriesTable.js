'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'categories',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.TEXT,
        },
        total: {
          type: Sequelize.TEXT,
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        BudgetId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'budgets',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('categories')
  }
};
