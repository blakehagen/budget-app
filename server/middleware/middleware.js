'use strict';

const _      = require('lodash');
const jwt    = require('jwt-simple');
const secret = process.env.JWT_SECRET || _.get(require('../../server/config/secret.js'), 'tokenSecret', false);

module.exports = {

  isAuthenticated: (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized');
    }

    let token = _.last(req.headers.authorization.split(' '));

    try {
      let decoded = jwt.decode(token, process.env.JWT_SECRET || secret);
      if (decoded) {
        return next();
      }
    }
    catch (err) {
      return res.status(401).send('Token Error');
    }
  }

};