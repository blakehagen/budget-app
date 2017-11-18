import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import styles from './topBar.scss';

@inject('userStore', 'navigator')
@observer
export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;
  }

  render() {
    return (
      <div className={styles.topBarMain}>

        {this.userStore.showBackArrow ?
          <div className={styles.navIcons}>
            <div className={styles.backArrowContainer} onClick={this.goToDashboard}>
              <div className={styles.backIcon} />
            </div>
          </div> : null}

        <div className={styles.piggybankIcon} />
        <div className={styles.welcome}>{this.userStore.user.firstName} {this.userStore.user.lastName} &nbsp;
          |&nbsp;&nbsp;</div>
        <div className={styles.logoutAction}>
          <span onClick={this.logout}>Log Out</span>
        </div>
      </div>
    );
  }

  goToDashboard() {
    this.navigator.changeRoute(`/${this.userStore.userId}/dashboard`, 'push');
  }

  logout() {
    this.userStore.logout();
  }
}
