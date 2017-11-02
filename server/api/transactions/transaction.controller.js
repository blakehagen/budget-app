const models = require('../../models/index');

module.exports = {

  createTransaction(req, res) {
    models.Transaction.create(req.body)
      .then(transaction => res.status(200).json({ transaction, success: true }))
      .catch((err) => {
        console.log('err', err);
        return res.status(400).json({ error: err });
      });
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
