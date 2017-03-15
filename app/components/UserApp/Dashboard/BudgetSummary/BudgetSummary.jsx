import React from 'react';
import {observer, inject} from 'mobx-react';
import autoBind from 'react-autobind';
import {ProgressBar} from 'react-bootstrap';
import styles from './budgetSummary.scss';

@inject('userStore', 'navigator')
@observer
export default class BudgetSummary extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;
  }

  render() {

    const budgets = _.map(this.userStore.user.Budgets, budget => {

      let currentTotal = 0;
      _.each(budget.Transactions, transaction => {
        console.log('transaction.amount --> ', transaction.amount);
        currentTotal += Number(transaction.amount);
      });

      console.log('currentTotal --> ', currentTotal);

      return (
        <div className={styles.budgetContainer} key={budget.id}>
          <div className={styles.budgetTitle}>
            {budget.name}
          </div>
          <div className={styles.budgetMain}>
            <ProgressBar min={0} now={currentTotal} max={Number(budget.totalAmount)} label={`$${currentTotal}`} className={styles.progressBar} bsStyle="success"/>
          </div>
        </div>
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