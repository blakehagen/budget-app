import _ from 'lodash';
import numeral from 'numeral';
import React from 'react';
import {observer, inject} from 'mobx-react';
import DetailsStatus from './DetailsStatus';
import autoBind from 'react-autobind';
import styles from './budgetDetails.scss';

@inject('userStore', 'navigator')
@observer
export default class BudgetDetails extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;
  }

  render() {
    if (!this.userStore.selectedBudget) {
      return null;
    }
    const transactions = _.map(this.userStore.selectedBudget.transactions, transaction => {
      const transactionAmount = numeral(transaction.amount).format('$0,0.00');
      return (
        <div className={styles.transactionContainer} key={transaction.id}>
          <div className={styles.amountContainer}>
            {transactionAmount}
          </div>
          <div className={styles.transactionDetailsContainer}>
            <div className={styles.row}>
              {transaction.postedDateHumanized}
            </div>
            <div className={styles.row}>
              {transaction.vendor}
            </div>
            <div className={styles.row}>
              <span className={styles.description}>{transaction.description}</span>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className={styles.budgetDetailsMain}>
        <DetailsStatus/>
        {transactions}
      </div>
    );
  }
}