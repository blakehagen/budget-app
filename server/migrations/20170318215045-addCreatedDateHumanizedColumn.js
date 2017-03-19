'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'budgets',
      'createdDateHumanized',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('budgets', 'createdDateHumanized');
  }
};
