import _ from 'lodash';
import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import BudgetCard from './BudgetCard';
import styles from './budgetSummary.scss';

@inject('dataStore', 'navigator')
@observer
export default class BudgetSummary extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;
  }

  componentWillMount() {
    this.dataStore.clearSelectedBudget();
  }

  goToBudgetCategoryView(selectedBudgetId) {
    this.dataStore.setSelectedBudget(selectedBudgetId);
    this.navigator.changeRoute(`/${this.dataStore.userId}/budget/${selectedBudgetId}`, 'push');
  }

  render() {
    const budgets = _.map(this.dataStore.budgetSummaries, ({
      id,
      name,
      budgetLimit,
      budgetSpent,
      difference,
    }) => {
      return (
        <BudgetCard
          key={id}
          id={id}
          name={name}
          limit={budgetLimit}
          spent={budgetSpent}
          remaining={difference}
          details={this.goToBudgetCategoryView}
        />
      );
    });

    return (
      <div className={styles.budgetSummaryMain}>
        <div className={styles.budgets}>
          {budgets}
        </div>
      </div>
    );
  }
}
