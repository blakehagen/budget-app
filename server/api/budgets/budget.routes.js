
const budgetCtrl = require('./budget.controller.js');
const middleware = require('../../middleware/middleware');

module.exports = (app) => {
  app.route('/api/v1/budgets/create')
    .post(middleware.isAuthenticated, budgetCtrl.createBudget);

  app.route('/api/v1/budgets/close/:budgetId')
    .put(middleware.isAuthenticated, budgetCtrl.closeBudget);

  app.route('/api/v1/budgets/categories/list/:budgetId')
    .get(middleware.isAuthenticated, budgetCtrl.getCategoryList);

  app.route('/api/v1/budgets/categories/:budgetId')
    .get(middleware.isAuthenticated, budgetCtrl.getBudgetCategories);

  // app.route('/api/v1/budgets/:userId')
  //   .get(middleware.isAuthenticated, budgetCtrl.getUserBudgets);
};
