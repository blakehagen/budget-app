

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(
      'transactions',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        vendor: {
          type: Sequelize.TEXT,
        },
        amount: {
          type: Sequelize.DECIMAL,
        },
        date: {
          type: Sequelize.DATE,
        },
        description: {
          type: Sequelize.TEXT,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
        CategoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
      },
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('transactions');
  },
};
