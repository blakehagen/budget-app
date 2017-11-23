import _ from 'lodash';
// import numeral from 'numeral';
import React from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import { reaction } from 'mobx';
import autoBind from 'react-autobind';
import ActionHeader from '../ActionHeader';
import Summary from '../Summary';

// import Spinner from 'components/Common/Spinner';
// import BudgetCard from './BudgetCard';
// import { ProgressBar } from 'react-bootstrap';
import styles from './budgetCategoryView.scss';

@inject('dataStore', 'navigator')
@observer
export default class BudgetCategoryView extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;
  }

  componentDidMount() {
    const location = browserHistory.getCurrentLocation();
    const budgetId = _.last(_.split(location.pathname, '/'));
    this.dataStore.getBudgetCategories(budgetId);

    this.reaction = reaction(() => _.get(this.dataStore, 'selectedBudgetCategoriesLoaded'), categoriesLoaded => categoriesLoaded, true);
  }

  componentWillUnmount() {
    this.dataStore.resetSelectedBudget();
    this.reaction();
  }

  render() {
    if (!_.get(this.dataStore, 'selectedBudgetCategoriesLoaded', null)) {
      return <div>LOADING....</div>;
    }
    console.log('this.dataStore.selectedBudget -->', this.dataStore.selectedBudget);

    // const budgets = _.map(this.dataStore.budgetSummaries, ({
    //                                                          id,
    //                                                          name,
    //                                                          budgetLimit,
    //                                                          budgetSpent,
    //                                                          difference,
    //                                                        }) => {
    //   return (
    //     <BudgetCard
    //       key={id}
    //       id={id}
    //       name={name}
    //       limit={budgetLimit}
    //       spent={budgetSpent}
    //       remaining={difference}
    //     />
    //   );

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
    // });

    return (
      <div>
        <ActionHeader />
        <div className={styles.mainWrapper}>
          <div className={styles.categories}>

            <Summary
              type="budget"
              name={this.dataStore.selectedBudget.name}
              limit={this.dataStore.selectedBudget.budgetLimit}
              spent={this.dataStore.selectedBudget.budgetSpent}
              remaining={this.dataStore.selectedBudget.difference}
            />



          </div>
        </div>
      </div>
    );
  }
}
