import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import styles from './dashboardHeader.scss';

@inject('dataStore', 'navigator')
@observer
export default class DashboardHeader extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;
  }

  render() {
    return (
      <div>
        <div className={styles.actionContainer}>

          <div className={styles.bigButton} onClick={this.createNewTransaction}>
            <div className={styles.plusIcon} />
            <span className={styles.buttonLabel}>Transaction</span>
          </div>

          <div className={styles.bigButton} onClick={this.createNewBudget}>
            <div className={styles.plusIcon} />
            <span className={styles.buttonLabel}>Budget</span>
          </div>

        </div>
      </div>
    );
  }

  createNewBudget() {
    this.navigator.changeRoute(`/${this.dataStore.userId}/create-budget`, 'push');
  }

  createNewTransaction() {
    this.navigator.changeRoute(`/${this.dataStore.userId}/new-transaction`, 'push');
  }
}
