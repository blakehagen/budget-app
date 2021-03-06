

const bcrypt = require('bcrypt-nodejs');
const BPromise = require('bluebird');

module.exports = (sequelize, DataTypes) => {
  let User;
  let models;

  User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    tableName: 'users',
    timestamps: true,
    classMethods: {
      init(_models) {
        models = _models;
        User.hasMany(models.Budget);
        User.belongsToMany(models.Budget, {
          through: { model: models.Budget_User, unique: false },
          foreignKey: 'UserId',
        });
      },
      generateHash(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
      },
      isEmailUnique(email) {
        return User.find({
          where: {
            email: { $ilike: email },
          },
        })
          .then((user) => {
            if (user) {
              return BPromise.reject('Email already in use!');
            }
          });
      },
    },
    instanceMethods: {
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
  });
  return User;
};
