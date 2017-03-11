import React from 'react';
import {observer, inject} from 'mobx-react';
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
        <div className={styles.piggybankIcon}></div>
        <div className={styles.welcome}>{this.userStore.user.firstName} {this.userStore.user.lastName}</div>
        <div className={styles.logOut}>
          <span className={styles.logoutAction} onClick={this.logout}>Log Out</span>
        </div>
      </div>
    );
  }

  logout() {
    this.userStore.logout();
  }

}