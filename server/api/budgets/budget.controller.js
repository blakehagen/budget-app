const _ = require('lodash');
const BPromise = require('bluebird');
const models = require('../../models/index');
const budgetUtils = require('../../utils/budgetUtils');

module.exports = {
  /* ****************************************************************************
  CREATE NEW BUDGET
  **************************************************************************** */
  createBudget(req, res, next) {
    const { name, recurring, monthYear, status, createdDateHumanized, categories } = req.body;
    const budgetToCreate = {
      name,
      recurring,
      monthYear,
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
        }))
          .then(() => {
          // Will add budgetLimit and difference on front end //
            const budgetCreatedSummary = {
              id: budget.id,
              name: budget.name,
              status: budget.status,
              recurring: budget.recurring,
              monthYear: budget.monthYear,
              createdDateHumanized: budget.createdDateHumanized,
              budgetSpent: 0,
            };

            return res.status(200).json({ success: true, budget: budgetCreatedSummary });
          });
      })
      .catch(err => next(err));
  },

  /* ****************************************************************************
  GET BUDGET CATEGORY LIST
  **************************************************************************** */
  getCategoryList(req, res, next) {
    models.Category.getCategoryList(req.params.budgetId)
      .then(categories => res.status(200).json({ success: true, categories }))
      .catch(err => next(err));
  },

  /* ****************************************************************************
  GET BUDGET CATEGORY DETAILS
  **************************************************************************** */
  getBudgetCategories(req, res, next) {
    models.Category.getCategoryDetails(req.params.budgetId)
      .then((response) => {
        const categories = budgetUtils.numberifyData(response);
        return res.status(200).json({ success: true, categories });
      })
      .catch(err => next(err));
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
