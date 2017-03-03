'use strict';
const _      = require('lodash');
const jwt    = require('jwt-simple');
const models = require('../../models/index');
const secret = require('../../config/secret');

module.exports = {

  // SIGN UP / REGISTER //
  register (req, res) {
    //TODO --> register logic --> hash pw, create user, send token
  },

  // LOG IN //
  login(req, res) {
    models.User.findOne({where: {email: req.body.email}})
      .then((user) => {
        if (!user) {
          return res.status(404).json({error: 'User not found'});
        }
        //TODO --> login logic --> verify pw, send token
        return res.status(200).json(user);
      })
  },

  // Will hit middleware first to verify token
  verifyUser(req, res) {
    return res.status(200).json({success: true})
  },

  // testing
  test(req, res) {
    models.User.findOne({where: {email: req.body.email}})
      .then((user) => {
        if (!user) {
          return res.status(404).json({error: 'Account not found'});
        }
        return res.status(200).json(user);
      })
  }
};