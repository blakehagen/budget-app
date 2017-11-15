const _ = require('lodash');

module.exports = {
  getDifference(budgetSummaries) {
    return _.map(budgetSummaries, (budget) => {
      budget.budgetLimit = _.toNumber(budget.budgetLimit);
      budget.budgetSpent = _.toNumber(budget.budgetSpent);
      budget.difference = budget.budgetLimit - budget.budgetSpent;
      return budget;
    });
  },
};
