import _ from 'lodash';
import numeral from 'numeral';
import React from 'react';
import {reaction} from 'mobx';
import {observer, inject} from 'mobx-react';
import Spinner from 'components/Common/Spinner';
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
      this.goToBudgetSummary();
      return null;
    }

    if (this.userStore.loadingNewTransaction) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner/>
        </div>
      );
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
              <span className={styles.date}>{transaction.postedDateHumanized}</span>
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
      <div>
        <DetailsStatus/>
        <div>
          {transactions}
        </div>
      </div>
    );
  }

  goToBudgetSummary() {
    this.navigator.changeRoute(`/user/${this.userStore.userId}/dashboard`, 'replace');
  }
}