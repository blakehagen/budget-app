import _ from 'lodash';
import numeral from 'numeral';
import React from 'react';
import {observer, inject} from 'mobx-react';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
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

    console.log('this.userStore.selectedBudget on details component --> ', this.userStore.selectedBudget);

    // const budgets = _.map(this.userStore.userBudgets, budget => {
    //   let currentTotal = 0;
    //   _.each(budget.transactions, transaction => {
    //     currentTotal += Number(transaction.amount);
    //   });
    //
    //   let percentageUsed = currentTotal / budget.totalAmount * 100;
    //   console.log('percentageUsed --> ', percentageUsed);
    //
    //   return (
    //     <div>
    //       this is the Details
    //     </div>
    //
    //   );
    // });

    return (
      <div className={styles.budgetDetailsMain}>
        <div className={styles.title}>
          {this.userStore.selectedBudget.name}
        </div>
        <div className={styles.summary}>
          used 100 of 1000
        </div>

        this is the Details
      </div>
    );
  }
}