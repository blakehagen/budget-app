const models = require('../../models/index');

module.exports = {

  createUser (req, res) {
    console.log('req.body ---> ', req.body);

    models.User.create(req.body)
      .then(user => {
        return res.status(200).json({user: user, success: true});
      })
      .catch(err => {
        console.log('err', err);
        return res.status(400).json({error: err});
      });
  },

  getUser(req, res) {
    models.User.findById(req.params.userId, {
      include: {
        model: models.Budget,
        attributes: ['name'],
        include: {
          model: models.Category,
          include: {
            model: models.Transaction
          }
        }
      },
      attributes: ['id', 'firstName', 'lastName', 'email']
    })
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(400).json({error: err});
      });
  },

  getAllUsers (req, res) {
    models.User.findAll({
      include: {
        model: models.Budget,
        attributes: ['name']
      },
      attributes: ['id', 'firstName', 'lastName', 'email']
    })
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(400).json({error: err});
      });
  },


};