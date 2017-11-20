import _ from 'lodash';
// import numeral from 'numeral';
import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
// import Spinner from 'components/Common/Spinner';
import BudgetCard from './BudgetCard';
// import { ProgressBar } from 'react-bootstrap';
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

  componentDidMount() {
    this.dataStore.selectedBudget = null;
  }

  // goToBudgetDetails(selectedBudget) {
  //   this.dataStore.selectedBudget = selectedBudget;
  //   this.navigator.changeRoute(`/user/${this.dataStore.userId}/budget/${selectedBudget.id}`, 'push');
  // }

  render() {
    // const loadingNewBudget = (
    //   <div className={styles.budgetLoading}>
    //     <Spinner />
    //   </div>
    // );

    const budgets = _.map(this.dataStore.budgetSummaries, ({ id, name, budgetLimit, budgetSpent, difference }) => {
      return (
        <BudgetCard
          key={id}
          id={id}
          name={name}
          limit={budgetLimit}
          spent={budgetSpent}
          remaining={difference}
        />
      )

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
          {this.dataStore.loadingNewBudget ? loadingNewBudget : null}
          {budgets}
        </div>
      </div>
    );
  }
}
