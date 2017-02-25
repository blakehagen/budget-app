'use strict';

const userCtrl   = require('./user.controller');
const middleware = require('../../middleware/middleware');

module.exports = (app) => {

  app.route('/api/v1/users/create')
    .post(userCtrl.createUser);

  app.route('/api/v1/users')
    .get(middleware.isAuthenticated, userCtrl.getAllUsers);

};
