const _ = require('lodash');
const jwt = require('jwt-simple');
const models = require('../../models/index');
const budgetUtils = require('../../utils/budgetUtils');

let secret = process.env.JWT_SECRET;

if (!secret) {
  secret = _.get(require('../../../server/config/secret.js'), 'tokenSecret');
}

function getUserBudgetSnapshots(userId) {
  return models.Budget.getBudgetSnapshots(userId)
    .then(budgets => (budgetUtils.getDifference(budgets)));
}

function generateToken(userId, userEmail) {
  return jwt.encode({
    userId,
    email: userEmail,
  }, process.env.JWT_SECRET || secret);
}

module.exports = {

  /* ****************************************************************************
   Check User Session
   **************************************************************************** */
  sessionCheck(req, res, next) {
    let result = false;
    if (_.get(req.session, 'user', null)) {
      result = true;
    }
    return res.status(200).json({
      user: _.get(req.session, 'user', null),
      result,
    });
  },

  /* ****************************************************************************
   Initial User Register
   **************************************************************************** */
  register(req, res, next) {
    models.User.isEmailUnique(req.body.email)
      .then(() => {
        const newUserInfo = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: models.User.generateHash(req.body.password),
        };

        models.User.create(newUserInfo)
          .then((createdUser) => {
            const user = {
              id: createdUser.id,
              firstName: createdUser.firstName,
              lastName: createdUser.lastName,
              email: createdUser.email,
            };

            const token = generateToken(user.id, user.email);

            req.session.user = user;

            return res.status(200).json({ user, token, success: true });
          });
      })
      .catch(err => next(err));
  },

  /* ****************************************************************************
   Login
   **************************************************************************** */
  login(req, res, next) {
    models.User.findOne({
      where: { email: req.body.email },
      attributes: ['id', 'firstName', 'lastName', 'email', 'password'],
    })
      .then((user) => {
        if (!user) {
          const err = new Error('User email not found', 'noUserEmail');
          return next(err);
        }

        if (!user.validPassword(req.body.password)) {
          const err = new Error('Invalid password');
          return next(err);
        }

        return getUserBudgetSnapshots(user.id)
          .then((userBudgets) => {
            const userData = {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              budgetSummaries: userBudgets,
            };

            req.session.user = userData;

            const token = generateToken(user.id, user.email);

            return res.status(200).json({ user: userData, token, success: true });
          });
      })
      .catch(err => next(err));
  },

  /* ****************************************************************************
   Verify Authenticated User
   **************************************************************************** */
  verifyUser(req, res) {
    return res.status(200).json({ success: true });
  },
};
