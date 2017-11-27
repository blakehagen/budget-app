import React from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import styles from './topBar.scss';

@inject('dataStore', 'navigator')
@observer
export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;
  }

  goBack() {
    const location = browserHistory.getCurrentLocation();
    let newRoute = `/${this.dataStore.userId}/dashboard`;

    if (_.includes(location.pathname, 'category') && _.get(this.dataStore, 'selectedBudget.id', null)) {
      newRoute = `/${this.dataStore.userId}/budget/${this.dataStore.selectedBudget.id}`;
    }

    this.navigator.changeRoute(newRoute, 'push');
  }

  logout() {
    this.dataStore.logout();
  }

  render() {
    return (
      <div className={styles.topBarMain}>

        {this.dataStore.showBackArrow ?
          <div className={styles.navIcons}>
            <div
              className={styles.backArrowContainer}
              onClick={this.goBack}
            >
              <div className={styles.backIcon} />
            </div>
          </div> : null}

        <div className={styles.piggybankIcon} />
        <div className={styles.welcome}>
          {this.dataStore.user.firstName} {this.dataStore.user.lastName} &nbsp;|&nbsp;&nbsp;
        </div>
        <div className={styles.logoutAction}>
          <span onClick={this.logout}>Log Out</span>
        </div>
      </div>
    );
  }
}
