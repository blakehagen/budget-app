

module.exports = (sequelize, DataTypes) => {
  let Transaction;
  let models;

  Transaction = sequelize.define('Transaction', {
    vendor: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    postedDateHumanized: DataTypes.STRING,
    description: DataTypes.STRING,
    PostedByUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
  }, {
    tableName: 'transactions',
    timestamps: true,
    classMethods: {
      init(_models) {
        models = _models;
        Transaction.belongsTo(models.Category);
      },
      getTransactions(budgetId) {
        const sql = `SELECT t.id, t.vendor, t.amount, t.description, t."postedDateHumanized" from transactions t WHERE t."BudgetId" = ${budgetId} ORDER BY -t.id`;

        return sequelize.query(sql, {
          raw: true,
          type: models.Sequelize.QueryTypes.SELECT,
        });
      },
    },
  });
  return Transaction;
};
