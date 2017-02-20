const models = require('../../models/index');

module.exports = {

  createUser (req, res) {
    console.log('req.body ---> ', req.body);

    models.User.create(req.body)
      .then(user => {
        res.status(200).json({user: user, success: true});
      })
      .catch(err => {
        console.log('err', err);
        res.status(400).json({error: err});
      });
  }
};