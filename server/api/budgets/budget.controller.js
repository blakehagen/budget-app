const models = require('../../models/index');

module.exports = {

  createBudget (req, res) {
    models.Budget.create(req.body)
      .then(budget => {
        models.Budget_User.create({
          UserId: req.body.CreatedByUserId,
          BudgetId: budget.id
        })
          .then(response => {

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
  }

};