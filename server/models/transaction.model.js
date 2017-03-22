'use strict';

module.exports = (sequelize, DataTypes) => {
  let Transaction;
  let models;

  Transaction = sequelize.define('Transaction', {
    vendor: DataTypes.TEXT,
    amount: DataTypes.DECIMAL,
    postedDateHumanized: DataTypes.TEXT,
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
      },
      getTransactions: function (budgetId) {
        let sql = `SELECT t.id, t.vendor, t.amount, t.description, t."postedDateHumanized" from transactions t WHERE t."BudgetId" = ${budgetId}`;

        return sequelize.query(sql, {
          raw: true,
          type: models.Sequelize.QueryTypes.SELECT
        });
      }
    },
  });
  return Transaction;
};