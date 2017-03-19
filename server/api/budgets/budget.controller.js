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
            return res.status(200).json({budget: budget, success: true});
          });
      })
      .catch(err => {
        console.log('err', err);
        return res.status(400).json({error: err});
      });
  }

};