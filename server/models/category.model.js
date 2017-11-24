

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
      getCategoryList(budgetId) {
        const sql = `
          SELECT c.id, c.name
          FROM categories c
          WHERE c."BudgetId" = ${budgetId}
          ORDER BY c.name
        `;
        return sequelize.query(sql, {
          raw: true,
          type: models.Sequelize.QueryTypes.SELECT,
        });
      },
      getCategoryDetails(budgetId) {
        const sql = `
          SELECT c.id, c.name, c.limit,
            (SELECT SUM(t.amount)
                FROM transactions t
                WHERE t."CategoryId" = c.id
            ) as "spent"
          FROM categories c
          WHERE c."BudgetId" = ${budgetId}
          ORDER BY c.name
        `;
        return sequelize.query(sql, {
          raw: true,
          type: models.Sequelize.QueryTypes.SELECT,
        });
      },
    },
  });
  return Category;
};
