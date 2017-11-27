import React from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import styles from './actionHeader.scss';

@inject('dataStore', 'navigator')
@observer
export default class DashboardHeader extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;
  }

  createNewBudget() {
    this.navigator.changeRoute(`/${this.dataStore.userId}/create-budget`, 'push');
  }

  createNewTransaction() {
    this.navigator.changeRoute(`/${this.dataStore.userId}/new-transaction`, 'push');
  }

  render() {
    const location = browserHistory.getCurrentLocation();
    return (
      <div>
        <div className={styles.actionContainer}>
          {_.includes(location.pathname, 'dashboard') && (
            <div
              className={styles.bigButton}
              onClick={this.createNewBudget}
            >
              <div className={styles.plusIcon} />
              <span className={styles.buttonLabel}>Budget</span>
            </div>
          )}

          <div
            className={styles.bigButton}
            onClick={this.createNewTransaction}
          >
            <div className={styles.plusIcon} />
            <span className={styles.buttonLabel}>Transaction</span>
          </div>

        </div>
      </div>
    );
  }
}
