'use strict';

module.exports = (sequelize, DataTypes) => {
  let Transaction;
  let models;

  Transaction = sequelize.define('Transaction', {
    vendor: DataTypes.TEXT,
    amount: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    description: DataTypes.TEXT
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