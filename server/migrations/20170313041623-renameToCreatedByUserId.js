'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('budgets', 'UserId', 'CreatedByUserId');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.renameColumn('budgets', 'CreatedByUserId', 'UserId');
  }
};
