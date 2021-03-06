
const transactionCtrl = require('./transaction.controller');
const middleware = require('../../middleware/middleware');

module.exports = (app) => {
  app.route('/api/v1/transactions/:categoryId')
    .get(middleware.isAuthenticated, transactionCtrl.getTransactions);

  app.route('/api/v1/transactions/create')
    .post(middleware.isAuthenticated, transactionCtrl.createTransaction);

  app.route('/api/v1/transactions/delete/:transactionId')
    .delete(middleware.isAuthenticated, transactionCtrl.deleteTransaction);
};
