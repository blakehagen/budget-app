

const authCtrl = require('./auth.controller');
const middleware = require('../../middleware/middleware');

module.exports = (app) => {
  // ========================= //
  // CHECK IF STORED SESSION //
  // ========================= //
  app.route('/api/v1/session-check')
    .get(authCtrl.sessionCheck);

  // ======================= //
  // USER SIGN UP / REGISTER //
  // ======================= //
  app.route('/api/v1/signup')
    .post(authCtrl.register);

  // ========== //
  // USER LOGIN //
  // ========== //
  app.route('/api/v1/login')
    .post(authCtrl.login);

  // ========== //
  // VERIFY USER //
  // ========== //
  app.route('/api/v1/verify')
    .get(middleware.isAuthenticated, authCtrl.verifyUser);
};
