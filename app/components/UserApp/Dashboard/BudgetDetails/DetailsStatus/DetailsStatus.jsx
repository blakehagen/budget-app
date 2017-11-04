import _ from 'lodash';
import numeral from 'numeral';
import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import styles from './detailsStatus.scss';

@inject('userStore', 'navigator')
@observer
export default class DetailsStatus extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;
  }

  render() {
    const totalBudgetAmount = Number(this.userStore.selectedBudget.totalAmount);
    let currentTotal = 0;
    _.each(this.userStore.selectedBudget.transactions, (transaction) => {
      currentTotal += Number(transaction.amount);
    });
    const percentageUsed = currentTotal / totalBudgetAmount * 100;
    const remaining = totalBudgetAmount - currentTotal;
    const currentTotalFormatted = numeral(currentTotal).format('$0,0.00');
    const totalAmountFormatted = numeral(totalBudgetAmount).format('$0,0.00');
    const remainingFormatted = numeral(remaining).format('$0,0.00');

    return (
      <div className={styles.statusContainer}>
        <div className={styles.title}>
          {this.userStore.selectedBudget.name}
        </div>

        <div className={styles.summary}>
          <span className={styles.summaryNumber}>{totalAmountFormatted}</span> &nbsp;Budget Limit
        </div>

        <div className={styles.summary}>
          <span
            className={percentageUsed < 85 ? styles.underBudget : styles.overBudgetWarn}
          >{currentTotalFormatted}</span> &nbsp;
          Spent
        </div>

        <div className={styles.summary}>
          <span
            className={percentageUsed < 85 ? styles.underBudget : styles.overBudgetWarn}
          >{remainingFormatted}</span> &nbsp;
          Remaining
        </div>
        <div className={styles.addTransaction} onClick={this.newTransaction}>
          <div className={styles.plusIcon} />
          Transaction
        </div>
      </div>
    );
  }

  newTransaction() {
    this.navigator.changeRoute(`/user/${this.userStore.userId}/new-transaction`, 'push');
  }
}
