'use strict';

module.exports = (sequelize, DataTypes) => {
  let Budget;
  let models;

  Budget = sequelize.define('Budget', {
    name: DataTypes.STRING,
    totalAmount: DataTypes.NUMERIC,
    CreatedByUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {
    tableName: 'budgets',
    timestamps: true,
    classMethods: {
      init: function (_models) {
        models = _models;
        Budget.hasMany(models.Transaction);
        Budget.belongsToMany(models.User, {
          through: {model: models.Budget_User, unique: false},
          foreignKey: 'BudgetId'
        });
      }
    },
  });
  return Budget;
};