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

  goToBudgetCategoryView(selectedBudgetId) {
    console.log('click goToBudgetCategoryView', selectedBudgetId);
    // TODO: handle on store
    this.dataStore.selectedBudget = _.find(this.dataStore.budgetSummaries,
      { id: selectedBudgetId });
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

      // return (
      //   <div className={styles.budgetContainer} key={budget.id} onClick={() => this.goToBudgetDetails(budget)}>
      //     <div className={styles.budgetHeader}>
      //       <span className={styles.headerName}>{budget.name}</span>
      //       <span className={styles.total}>{numeral(totalBudgetAmount).format('$ 0,0[.]00')}</span>
      //
      //     </div>
      //     <div className={styles.budgetMain}>
      //       <ProgressBar
      //         min={0}
      //         now={percentageUsed > 100 ? totalBudgetAmount : currentTotal}
      //         max={totalBudgetAmount}
      //         label={percentageUsed > 18 ? numeral(currentTotal).format('$0,0.00') : ''}
      //         className={styles.progressBar}
      //         bsStyle={percentageUsed > 85 ? 'danger' : 'success'}
      //       />
      //     </div>
      //   </div>
      // );
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
