'use strict';

// EXPRESS //
const express     = require('express');
const compression = require('compression');
const session     = require('express-session');
const bodyParser  = require('body-parser');
const cors        = require('cors');
const logger      = require('morgan');

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
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(session({
    secret: 'g5~35$#hbb%#~`H$TWH@g~gfdg#GYha_#$%#%oibo',
    resave: false,
    saveUninitialized: true
  }));

  return app;
};