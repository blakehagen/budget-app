'use strict';

const _      = require('lodash');
const jwt    = require('jwt-simple');
const secret = _.get(require('../../server/config/secret.js'), 'tokenSecret', false);

module.exports = {

  isAuthenticated: (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized');
    }

    let token = _.last(req.headers.authorization.split(' '));
    console.log('token --> ', token);

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