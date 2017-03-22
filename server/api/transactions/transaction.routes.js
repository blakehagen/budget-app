'use strict';
const transactionCtrl = require('./transaction.controller');

module.exports = (app) => {

  app.route('/api/v1/transactions/create')
    .post(transactionCtrl.createTransaction);

};