
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
          type: Sequelize.STRING,
        },
        amount: {
          type: Sequelize.NUMERIC,
        },
        description: {
          type: Sequelize.NUMERIC,
        },
        postedDate: {
          type: Sequelize.STRING,
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
        PostedByUserId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
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
    return queryInterface.dropTable('transactions');
  },
};
