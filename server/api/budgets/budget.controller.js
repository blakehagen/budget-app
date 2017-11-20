const _ = require('lodash');
const BPromise = require('bluebird');
const models = require('../../models/index');

module.exports = {
  /* ****************************************************************************
  CREATE NEW BUDGET
  **************************************************************************** */
  createBudget(req, res) {
    const { name, recurring, status, createdDateHumanized, categories } = req.body;
    const budgetToCreate = {
      name,
      recurring,
      status,
      createdDateHumanized,
      CreatedByUserId: _.get(req.session, 'user.id'),
    };

    models.Budget.create(budgetToCreate)
      .then((budget) => {
        models.Budget_User.create({
          UserId: budgetToCreate.CreatedByUserId,
          BudgetId: budget.id,
        });

        BPromise.each(categories, category => models.Category.create({
          name: category.name,
          limit: category.limit,
          BudgetId: budget.id,
        })
          .then(() => {
            console.log('okie dokie??');
          }))
          .then(() => {
            console.log('we done!');
            return res.status(200).json({ success: true });
          });
      })
      .catch((err) => {
        console.log('err', err);
        return res.status(400).json({ error: err });
      });
  },

  // getUserBudgets(req, res) {
  //   models.Budget.getUserBudgets(req.params.userId)
  //     .then(budgets => BPromise.each(budgets, budget => models.Transaction.getTransactions(budget.id)
  //       .then((transactions) => {
  //         budget.transactions = transactions;
  //       }))
  //       .then(() => res.status(200).json(budgets)))
  //     .catch((err) => {
  //       console.log('err', err);
  //       return res.status(400).json({ error: err });
  //     });
  // },

};
