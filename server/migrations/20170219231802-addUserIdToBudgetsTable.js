

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'budgets',
      'UserId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('budgets', 'UserId');
  },
};
