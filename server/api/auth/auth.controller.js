'use strict';
const _      = require('lodash');
const jwt    = require('jwt-simple');
const models = require('../../models/index');
const secret = _.get(require('../../../server/config/secret.js'), 'tokenSecret', false);

module.exports = {

  // USER INITIAL SIGN UP //
  register (req, res) {
    models.User.isEmailUnique(req.body.email)
      .then(() => {

        let newUserInfo = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: models.User.generateHash(req.body.password)
        };

        models.User.create(newUserInfo)
          .then(createdUser => {

            let token = jwt.encode({
              userId: createdUser.id,
              email: createdUser.email
            }, process.env.JWT_SECRET || secret);

            const userBasicInfo = {
              id: createdUser.id,
              firstName: createdUser.firstName,
              lastName: createdUser.lastName
            };

            return res.status(200).json({user: userBasicInfo, token: token, success: true});
          });
      })
      .catch(err => {
        return res.status(400).json({error: err});
      });
  },

  // LOG IN //
  login (req, res) {
    models.User.findOne({where: {email: req.body.email}})
      .then((user) => {
        if (!user) {
          return res.status(404).json({error: 'User not found'});
        }
        //TODO --> login logic --> verify pw, send token
        return res.status(200).json(user);
      });
  },

  // Will hit middleware first to verify token
  verifyUser(req, res) {
    return res.status(200).json({success: true});
  },

  // testing
  test(req, res) {
    models.User.findOne({where: {email: req.body.email}})
      .then((user) => {
        if (!user) {
          return res.status(404).json({error: 'Account not found'});
        }
        return res.status(200).json(user);
      });
  }
};