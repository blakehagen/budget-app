'use strict';

module.exports = (sequelize, DataTypes) => {
  let Budget;
  let models;

  Budget = sequelize.define('Budget', {
    name: DataTypes.STRING,
    UserId: {
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
        Budget.belongsTo(models.User);
        Budget.hasMany(models.Category);
      }
    },
  });
  return Budget;
};