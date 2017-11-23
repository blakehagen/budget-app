const _ = require('lodash');

module.exports = {
  getDifference(budgetSummaries) {
    const budgetData = this.numberifyData(budgetSummaries);
    return _.map(budgetData, (budget) => {
      budget.difference = budget.budgetLimit - budget.budgetSpent; // eslint-disable-line
      return budget;
    });
  },

  numberifyData(data) {
    return _.map(data, (obj) => {
      _.forEach(obj, (val, key) => {
        if (key === 'limit' || key === 'spent' || key === 'budgetLimit' || key === 'budgetSpent') {
          obj[key] = _.toNumber(val); // eslint-disable-line
        }
      });
      return obj;
    });
  },
};
