import _ from 'lodash';
import numeral from 'numeral';
import React from 'react';
import { observer, inject } from 'mobx-react';
import Spinner from 'components/Common/Spinner';
import DetailsStatus from './DetailsStatus';
import autoBind from 'react-autobind';
import styles from './budgetDetails.scss';

@inject('dataStore', 'navigator')
@observer
export default class BudgetDetails extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;
  }

  componentWillMount() {
    this.dataStore.showBackArrow = true;
  }

  render() {
    if (!this.dataStore.selectedBudget) {
      this.goToBudgetSummary();
      return null;
    }

    if (this.dataStore.updatingTransactions) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner />
        </div>
      );
    }

    const transactions = _.map(this.dataStore.selectedBudget.transactions, (transaction) => {
      const transactionAmount = numeral(transaction.amount).format('$0,0.00');
      return (
        <div
          className={styles.transactionContainer}
          key={transaction.id}
        >
          <div className={styles.amountContainer}>
            {transactionAmount}
            <div className={styles.actionContainer}>
              <div
                className={styles.deleteTransactionIcon}
                onClick={() => this.deleteTransaction(transaction)}
              />
              {/* <div className={styles.editTransactionIcon}/>*/}
            </div>
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
        <DetailsStatus />
        <div>
          {transactions}
        </div>
      </div>
    );
  }

  goToBudgetSummary() {
    this.navigator.changeRoute(`/user/${this.dataStore.userId}/dashboard`, 'replace');
  }

  deleteTransaction(transaction) {
    this.dataStore.deleteTransaction(transaction.id);
    this.dataStore.updatingTransactions = true;
  }
}
