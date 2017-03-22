'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('transactions', 'date', 'postedDateHumanized');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('transactions', 'postedDateHumanized', 'date');
  }
};
