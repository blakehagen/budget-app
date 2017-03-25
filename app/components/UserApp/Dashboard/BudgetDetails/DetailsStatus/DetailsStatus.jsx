import _ from 'lodash';
import numeral from 'numeral';
import React from 'react';
import {observer, inject} from 'mobx-react';
import autoBind from 'react-autobind';
import styles from './detailsStatus.scss';

@inject('userStore')
@observer
export default class DetailsStatus extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
  }

  render() {

    let totalBudgetAmount = Number(this.userStore.selectedBudget.totalAmount);
    let currentTotal      = 0;
    _.each(this.userStore.selectedBudget.transactions, transaction => {
      currentTotal += Number(transaction.amount);
    });
    let percentageUsed = currentTotal / totalBudgetAmount * 100;
    let remaining      = totalBudgetAmount - currentTotal;
    console.log('remaining --> ', remaining);
    console.log('percentageUsed on details --> ', percentageUsed);
    console.log('totalBudgetAmount --> ', totalBudgetAmount);

    let currentTotalFormatted = numeral(currentTotal).format('$0,0.00');
    let totalAmountFormatted  = numeral(totalBudgetAmount).format('$0,0.00');
    let remainingFormatted    = numeral(remaining).format('$0,0.00');

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
            className={percentageUsed < 85 ? styles.underBudget : styles.overBudgetWarn}>{currentTotalFormatted}</span> &nbsp;
          Spent
        </div>

        <div className={styles.summary}>
          <span
            className={percentageUsed < 85 ? styles.underBudget : styles.overBudgetWarn}>{remainingFormatted}</span> &nbsp;
          Remaining
        </div>
      </div>
    );
  }
}