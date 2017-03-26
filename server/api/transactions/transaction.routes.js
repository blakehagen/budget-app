'use strict';
const transactionCtrl = require('./transaction.controller');

module.exports = (app) => {

  app.route('/api/v1/transactions/create')
    .post(transactionCtrl.createTransaction);

  app.route('/api/v1/transactions/delete/:transactionId')
    .delete(transactionCtrl.deleteTransaction);
};