const BPromise = require('bluebird');
const models   = require('../../models/index');

module.exports = {

  createBudget (req, res) {
    models.Budget.create(req.body)
      .then(budget => {
        models.Budget_User.create({
          UserId: req.body.CreatedByUserId,
          BudgetId: budget.id
        })
          .then(() => {
            let newBudget = {
              id: budget.id,
              name: budget.name,
              totalAmount: budget.totalAmount
            };
            return res.status(200).json({budget: newBudget, success: true});
          });
      })
      .catch(err => {
        console.log('err', err);
        return res.status(400).json({error: err});
      });
  },

  getUserBudgets (req, res) {
    models.Budget.getUserBudgets(req.params.userId)
      .then(budgets => {
        return BPromise.map(budgets, budget => {
          return models.Transaction.findAll({
            where: {
              BudgetId: budget.id
            },
            attributes: ['id', 'vendor', 'amount', 'date', 'description']
          })
            .then(transactions => {
              budget.transactions = transactions;
              return budget;
            });
        })
          .then(() => {
            return res.status(200).json(budgets);
          });
      })
      .catch(err => {
        console.log('err', err);
        return res.status(400).json({error: err});
      });
  }

};