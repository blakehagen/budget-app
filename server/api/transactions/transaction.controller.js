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
  }

};