'use strict';

const bcrypt = require('bcrypt-nodejs');

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
      init: function (_models) {
        models = _models;
        User.hasMany(models.Budget);
        // User.belongsToMany(models.Budget, {through: {model: models.BudgetUser, unique: false}, foreignKey: 'UserId'});
      },
      generateHash: function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
      }
    },
    instanceMethods: {
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  return User;
};