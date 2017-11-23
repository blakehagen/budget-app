

module.exports = (sequelize, DataTypes) => {
  let Budget;
  let models;

  Budget = sequelize.define('Budget', {
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    recurring: DataTypes.BOOLEAN,
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
        Budget.hasMany(models.Category);
        Budget.belongsToMany(models.User, {
          through: { model: models.Budget_User, unique: false },
          foreignKey: 'BudgetId',
        });
      },

      getBudgetSnapshots(userId) {
        const sql = `
          SELECT b.id, b.name, b.status, b."createdDateHumanized",
            (SELECT SUM(c.limit)
              FROM categories c
              WHERE b.id = c."BudgetId"
            ) as "budgetLimit",
            (SELECT SUM(t.amount)
              FROM transactions t
              LEFT JOIN categories c
              ON c.id = t."CategoryId"
              WHERE b.id = c."BudgetId"
            ) as "budgetSpent"
          FROM budgets b
          WHERE b.status = 'active'
          AND b."CreatedByUserId" = ${userId}
          ORDER BY -b.id
        `;
        return sequelize.query(sql, {
          raw: true,
          type: models.Sequelize.QueryTypes.SELECT,
        });
      },

      getUserBudgets(userId) {
        const sql = `SELECT b.id, b.name, b."createdDateHumanized" FROM budgets b
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
