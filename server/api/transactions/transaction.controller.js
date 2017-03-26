const models = require('../../models/index');

module.exports = {

  createTransaction (req, res) {
    models.Transaction.create(req.body)
      .then(transaction => {
        return res.status(200).json({transaction: transaction, success: true});
      })
      .catch(err => {
        console.log('err', err);
        return res.status(400).json({error: err});
      });
  },

  deleteTransaction (req, res) {
    console.log('req.params.transactionId --> ', req.params.transactionId);
    models.Transaction.destroy({
      where: {
        id: req.params.transactionId
      }
    })
      .then(rowDeleted => {
        console.log('rowDeleted', rowDeleted);
        if (rowDeleted === 1) {
          return res.status(200).json({success: true});
        } else {
          throw new Error('Error deleting transaction');
        }
      })
      .catch(err => {
        console.log('err', err);
        return res.status(400).json({error: err});
      });
  }

};