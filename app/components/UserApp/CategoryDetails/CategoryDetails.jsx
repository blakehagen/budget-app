import _ from 'lodash';
import React from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import { reaction } from 'mobx';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
// import ActionHeader from '../ActionHeader';
import Summary from '../Summary';
import Transactions from './Transactions';
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

    this.reaction = reaction(() => _.get(this.dataStore, 'selectedCategoryTransactionsLoaded'), transactionsLoaded => transactionsLoaded, true);
  }

  componentWillUnmount() {
    this.reaction();
  }

  render() {
    if (!_.get(this.dataStore, 'selectedCategoryTransactionsLoaded', null)) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner />
        </div>
      );
    }

    return (
      <div>
        {/*<ActionHeader /> TODO -> Need / want this? */}
        <div className={styles.mainWrapper}>
          <div className={styles.detailsWrapper}>

            <div className={styles.summarySpacing}>
              <Summary
                type="category"
                name={_.get(this.dataStore, 'selectedCategory.name')}
                limit={_.get(this.dataStore, 'selectedCategory.limit')}
                spent={_.get(this.dataStore, 'selectedCategory.spent')}
                remaining={_.get(this.dataStore, 'selectedCategory.difference')}
              />
            </div>

            <Transactions
              transactions={_.get(this.dataStore, 'selectedCategory.transactions')}
            />

          </div>
        </div>
      </div>
    );
  }
}
