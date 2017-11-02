

const userCtrl = require('./user.controller');
const middleware = require('../../middleware/middleware');

module.exports = (app) => {
  app.route('/api/v1/users/create')
    .post(userCtrl.createUser);

  app.route('/api/v1/user/:userId')
    .get(middleware.isAuthenticated, userCtrl.getUser);

  app.route('/api/v1/users')
    .get(middleware.isAuthenticated, userCtrl.getAllUsers);
};
