
const authCtrl = require('./auth.controller');
const middleware = require('../../middleware/middleware');

module.exports = (app) => {
  app.route('/api/v1/session-check')
    .get(authCtrl.sessionCheck);

  app.route('/api/v1/signup')
    .post(authCtrl.register);

  app.route('/api/v1/login')
    .post(authCtrl.login);

  app.route('/api/v1/verify')
    .get(middleware.isAuthenticated, authCtrl.verifyUser);
};
