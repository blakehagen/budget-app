import _ from 'lodash';
import React from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import { reaction } from 'mobx';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
import ActionHeader from '../ActionHeader';
import Summary from '../Summary';
import Categories from './Categories';
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

  componentWillMount() {
    this.dataStore.setNavArrow(true);
  }

  componentDidMount() {
    const location = browserHistory.getCurrentLocation();
    const budgetId = _.last(_.split(location.pathname, '/'));
    this.dataStore.getBudgetCategories(budgetId);

    this.reaction = reaction(() => _.get(this.dataStore, 'selectedBudgetCategoriesLoaded'), categoriesLoaded => categoriesLoaded, true);
  }

  componentWillUnmount() {
    this.reaction();
  }

  viewDetails(categoryId) {
    console.log('categoryId for details -->', categoryId);
    this.navigator.changeRoute(`/${this.dataStore.userId}/budget/${this.dataStore.selectedBudget.id}/category/${categoryId}`, 'push');
  }

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

            <Categories
              categories={this.dataStore.selectedBudget.categories}
              handleClick={this.viewDetails}
            />

          </div>
        </div>
      </div>
    );
  }
}
