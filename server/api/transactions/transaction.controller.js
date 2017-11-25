const _ = require('lodash');
const models = require('../../models/index');
const budgetUtils = require('../../utils/budgetUtils');

module.exports = {
  /* ****************************************************************************
  GET TRANSACTION DETAILS BY CATEGORY ID
  **************************************************************************** */
  getTransactions(req, res, next) {
    models.Transaction.getTransactions(req.params.categoryId)
      .then((response) => {
        const transactions = budgetUtils.numberifyData(response);
        return res.status(200).json({ success: true, transactions });
      })
      .catch(err => next(err));
  },

  /* ****************************************************************************
  POST NEW TRANSACTION
  **************************************************************************** */
  createTransaction(req, res, next) {
    const { CategoryId, amount, vendor, description, postedDate } = req.body;
    const transactionToCreate = {
      CategoryId,
      amount,
      vendor,
      description,
      postedDate,
      PostedByUserId: _.get(req.session, 'user.id'),
    };

    models.Transaction.create(transactionToCreate)
      .then(transaction => res.status(200).json({ transaction, success: true }))
      .catch(err => next(err));
  },

  deleteTransaction(req, res) {
    models.Transaction.destroy({
      where: {
        id: req.params.transactionId,
      },
    })
      .then((rowDeleted) => {
        if (rowDeleted === 1) {
          return res.status(200).json({ success: true });
        }
        throw new Error('Error deleting transaction');
      })
      .catch((err) => {
        console.log('err', err);
        return res.status(400).json({ error: err });
      });
  },

};
