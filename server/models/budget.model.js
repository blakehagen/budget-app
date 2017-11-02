

module.exports = (sequelize, DataTypes) => {
  let Budget;
  let models;

  Budget = sequelize.define('Budget', {
    name: DataTypes.STRING,
    totalAmount: DataTypes.NUMERIC,
    createdDateHumanized: DataTypes.STRING,
    CreatedByUserId: {
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
    tableName: 'budgets',
    timestamps: true,
    classMethods: {
      init(_models) {
        models = _models;
        Budget.hasMany(models.Transaction);
        Budget.belongsToMany(models.User, {
          through: { model: models.Budget_User, unique: false },
          foreignKey: 'BudgetId',
        });
      },
      getUserBudgets(userId) {
        const sql = `SELECT b.id, b.name, b."totalAmount", b."createdDateHumanized" FROM budgets b
        INNER JOIN "budgets_users" bu ON bu."BudgetId" = b.id
        WHERE bu."UserId" = ${userId}
        ORDER BY -b.id`;

        return sequelize.query(sql, {
          raw: true,
          type: models.Sequelize.QueryTypes.SELECT,
        });
      },
    },
  });
  return Budget;
};
