

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
    },
  });
  return Category;
};
