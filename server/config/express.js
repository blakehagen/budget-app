
// EXPRESS //
const _ = require('lodash');
const express = require('express');
const compression = require('compression');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  sessionSecret = _.get(require('../../server/config/secret.js'), 'sessionSecret');
}

module.exports = () => {
  const app = express();
  app.use(compression({ threshold: 0 }));

  if (process.env.NODE_ENV !== 'production') {
    app.use(logger('dev'));
  } else {
    app.use(express.static('server/public', { maxAge: 86400000 * 30 /* 30d */ }));
  }

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    name: 'session',
    secret: sessionSecret,
    maxAge: 86400000 * 30, /* 30d */
  }));

  return app;
};
