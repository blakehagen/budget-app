'use strict';
const _      = require('lodash');
const jwt    = require('jwt-simple');
const models = require('../../models/index');
const secret = _.get(require('../../../server/config/secret.js'), 'tokenSecret', false);

module.exports = {

  // USER INITIAL SIGN UP //
  register(req, res) {
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
  login(req, res) {
    //TODO --> get user info you need...budgets, etc.
    models.User.findOne({
      where: {email: req.body.email},
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
      attributes: ['id', 'firstName', 'lastName', 'email', 'password']
    })
      .then(user => {
        if (!user) {
          return res.status(404).json({error: 'User email not found'});
        }

        if (!user.validPassword(req.body.password)) {
          return res.status(400).json({error: 'Invalid password'});
        }

        console.log('user---> ', user);

        const basicUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          Budgets: user.Budgets
        };

        let token = jwt.encode({
          userId: user.id,
          email: user.email
        }, process.env.JWT_SECRET || secret);

        return res.status(200).json({user: basicUser, token: token, success: true});
      })
      .catch(err => {
        return res.status(400).json({error: err});
      });
  },

  // VERIFY AUTHED USER //
  verifyUser(req, res) {
    return res.status(200).json({success: true});
  }

};