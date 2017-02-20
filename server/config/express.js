'use strict';

// EXPRESS //
const express    = require('express');
const session    = require('express-session');
const bodyParser = require('body-parser');
const cors       = require('cors');
const logger     = require('morgan');

module.exports = () => {
  const app = express();

  if (process.env.NODE_ENV !== 'production') {
    app.use(logger('dev'));
  }
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(session({
    secret: 'g535$#hbb%#H$TWH@g~gfdg#GYha_#$%#%oibo',
    resave: false,
    saveUninitialized: true
  }));
  app.use(express.static('app'));

  return app;
};