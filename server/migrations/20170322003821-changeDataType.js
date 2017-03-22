'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'transactions',
      'postedDateHumanized',
      {
        type: Sequelize.TEXT,
        allowNull: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('transactions', 'postedDateHumanized');

  }
};
