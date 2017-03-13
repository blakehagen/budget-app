'use strict';

module.exports = (sequelize, DataTypes) => {
  let Transaction;
  let models;

  Transaction = sequelize.define('Transaction', {
    vendor: DataTypes.TEXT,
    amount: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    PostedByUserId: {
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
    tableName: 'transactions',
    timestamps: true,
    classMethods: {
      init: function (_models) {
        models = _models;
        Transaction.belongsTo(models.Budget);
      }
    },
  });
  return Transaction;
};