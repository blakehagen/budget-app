const _ = require('lodash');
const jwt = require('jwt-simple');
const models = require('../../models/index');

let secret = process.env.JWT_SECRET;

if (!secret) {
  secret = _.get(require('../../../server/config/secret.js'), 'tokenSecret');
}

module.exports = {

  // USER INITIAL SIGN UP //
  register(req, res) {
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

            const userBasicInfo = {
              id: createdUser.id,
              firstName: createdUser.firstName,
              lastName: createdUser.lastName,
            };

            return res.status(200).json({ user: userBasicInfo, token, success: true });
          });
      })
      .catch(err => res.status(400).json({ error: err }));
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

        // Remove password field after validation
        const basicUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          Budgets: user.Budgets,
        };

        const token = jwt.encode({
          userId: user.id,
          email: user.email,
        }, process.env.JWT_SECRET || secret);

        return res.status(200).json({ user: basicUser, token, success: true });
      })
      .catch(err => next(err));
  },

  // VERIFY AUTHED USER //
  verifyUser(req, res) {
    return res.status(200).json({ success: true });
  },

};
