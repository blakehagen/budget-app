import _ from 'lodash';
import React from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import { reaction } from 'mobx';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
// import ActionHeader from '../ActionHeader';
import Summary from '../Summary';
// import Categories from './Categories';
import styles from './categoryDetails.scss';

@inject('dataStore', 'navigator')
@observer
export default class CategoryDetails extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;
  }

  componentWillMount() {
    this.dataStore.setNavArrow(true);
  }

  componentDidMount() {
    const location = browserHistory.getCurrentLocation();
    const categoryId = _.last(_.split(location.pathname, '/'));
    this.dataStore.getCategoryTransactions(categoryId);

    // this.reaction = reaction(() => _.get(this.dataStore, 'selectedBudgetCategoriesLoaded'), categoriesLoaded => categoriesLoaded, true);
  }

  // componentWillUnmount() {
  //   this.reaction();
  // }

  render() {
    if (!_.get(this.dataStore, 'selectedBudgetCategoriesLoaded', null)) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner />
        </div>
      );
    }

    return (
      <div>
        Where my deets at?
        {/*<ActionHeader />*/}
        {/*<div className={styles.mainWrapper}>*/}
          {/*<div className={styles.categories}>*/}

            {/*<Summary*/}
              {/*type="budget"*/}
              {/*name={this.dataStore.selectedBudget.name}*/}
              {/*limit={this.dataStore.selectedBudget.budgetLimit}*/}
              {/*spent={this.dataStore.selectedBudget.budgetSpent}*/}
              {/*remaining={this.dataStore.selectedBudget.difference}*/}
            {/*/>*/}

            {/*<Categories*/}
              {/*categories={this.dataStore.selectedBudget.categories}*/}
              {/*handleClick={this.viewDetails}*/}
            {/*/>*/}

          {/*</div>*/}
        {/*</div>*/}
      </div>
    );
  }
}
