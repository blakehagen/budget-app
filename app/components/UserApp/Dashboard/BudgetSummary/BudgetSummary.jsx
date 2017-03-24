import _ from 'lodash';
import numeral from 'numeral';
import React from 'react';
import {observer, inject} from 'mobx-react';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
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
    const loadingNewBudget = (
      <div className={styles.budgetLoading}>
        <Spinner/>
      </div>
    );

    const budgets = _.map(this.userStore.userBudgets, budget => {
      let currentTotal = 0;
      _.each(budget.transactions, transaction => {
        currentTotal += Number(transaction.amount);
      });

      let percentageUsed = currentTotal / budget.totalAmount * 100;
      console.log('percentageUsed --> ', percentageUsed);

      return (
        <div className={styles.budgetContainer} key={budget.id} onClick={this.goToBudgetDetails}>
          <div className={styles.budgetHeader}>
            <span className={styles.headerName}>{budget.name}</span>
            <span className={styles.total}>{numeral(budget.totalAmount).format('$ 0,0[.]00')}</span>

          </div>
          <div className={styles.budgetMain}>
            <ProgressBar min={0}
                         now={currentTotal}
                         max={Number(budget.totalAmount)}
                         label={percentageUsed > 15 ? numeral(currentTotal).format('$0,0.00') : ''}
                         className={styles.progressBar}
                         bsStyle={percentageUsed > 85 ? 'danger' : 'success'}/>
          </div>
        </div>
      );
    });

    return (
      <div className={styles.budgetSummaryMain}>
        <div className={styles.budgets}>
          {this.userStore.loadingNewBudget ? loadingNewBudget : null}
          {budgets}
        </div>
      </div>
    );
  }

  goToBudgetDetails() {
    console.log('budget clicked!');
  }

}