
const _ = require('lodash');
const jwt = require('jwt-simple');

let secret = process.env.JWT_SECRET;

if (!secret) {
  secret = _.get(require('../../server/config/secret.js'), 'tokenSecret');
}

module.exports = {

  isAuthenticated: (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized');
    }

    const token = _.last(req.headers.authorization.split(' '));

    try {
      const decoded = jwt.decode(token, process.env.JWT_SECRET || secret);
      if (decoded) {
        console.log('WE GOOD TO GO!!!!');
        return next();
      }
    } catch (err) {
      return res.status(401).send('Token Error');
    }
  },

};
