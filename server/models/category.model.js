

module.exports = (sequelize, DataTypes) => {
  let Category;
  let models;

  Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    limit: DataTypes.NUMERIC,
    description: DataTypes.STRING,
    BudgetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'budgets',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
  }, {
    tableName: 'categories',
    timestamps: true,
    classMethods: {
      init(_models) {
        models = _models;
        Category.hasMany(models.Transaction);
        Category.belongsTo(models.Budget);
      },
      // getUserBudgets(userId) {
      //   const sql = `SELECT b.id, b.name, b."createdDateHumanized" FROM budgets b
      //   INNER JOIN "budgets_users" bu ON bu."BudgetId" = b.id
      //   WHERE bu."UserId" = ${userId}
      //   ORDER BY -b.id`;
      //
      //   return sequelize.query(sql, {
      //     raw: true,
      //     type: models.Sequelize.QueryTypes.SELECT,
      //   });
      // },
    },
  });
  return Category;
};
