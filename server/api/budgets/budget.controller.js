const models = require('../../models/index');

module.exports = {

  createBudget (req, res) {
    console.log('req.body ----> ', req.body);

    models.Budget.create(req.body)
      .then(budget => {
        models.Budget_User.create({
          UserId: req.body.UserId,
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