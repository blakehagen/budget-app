'use strict';
const budgetCtrl = require('./budget.controller.js');

module.exports = (app) => {

  app.route('/api/v1/budgets/create')
    .post(budgetCtrl.createBudget);

  app.route('/api/v1/budgets/:userId')
    .get(budgetCtrl.getUserBudgets);

};
