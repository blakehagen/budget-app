'use strict';

module.exports = (sequelize, DataTypes) => {
  let Budget_User;
  let models;

  Budget_User = sequelize.define('Budget_User', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    BudgetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'budgets',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    tableName: 'budgets_users',
    timestamps: false,
    classMethods: {
      init: function (_models) {
        models = _models;
      }
    },
  });
  return Budget_User;
};