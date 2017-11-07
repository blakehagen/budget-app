const _ = require('lodash');
const jwt = require('jwt-simple');
const models = require('../../models/index');

let secret = process.env.JWT_SECRET;

if (!secret) {
  secret = _.get(require('../../../server/config/secret.js'), 'tokenSecret');
}

module.exports = {

  // USER INITIAL SIGN UP //
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
            const token = jwt.encode({
              userId: createdUser.id,
              email: createdUser.email,
            }, process.env.JWT_SECRET || secret);

            req.session.user = {
              id: createdUser.id,
              firstName: createdUser.firstName,
              lastName: createdUser.lastName,
              email: createdUser.email,
            };

            const user = {
              id: createdUser.id,
              firstName: createdUser.firstName,
              lastName: createdUser.lastName,
              email: createdUser.email,
            };

            return res.status(200).json({ user, token, success: true });
          });
      })
      .catch(err => next(err));
  },

  // LOG IN //
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

        req.session.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };

        // Remove password field after validation
        const userData = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };

        const token = jwt.encode({
          userId: user.id,
          email: user.email,
        }, process.env.JWT_SECRET || secret);

        return res.status(200).json({ user: userData, token, success: true });
      })
      .catch(err => next(err));
  },

  // VERIFY AUTHED USER //
  verifyUser(req, res) {
    return res.status(200).json({ success: true });
  },

};
