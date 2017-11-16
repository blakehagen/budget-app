import React from 'react';
import { reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
import TopBar from 'components/TopBar';
import styles from './userApp.scss';

@inject('userStore', 'navigator')
@observer
export default class UserApp extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;
  }

  // componentWillMount() {
  // if (!this.userStore.user && !this.userStore.loadingUser) {
  //   this.userStore.getUser(localStorage.getItem('userId'));
  // }
  // if (!this.userStore.budgetSummaries) {
  //   this.userStore.getUserBudgets(localStorage.getItem('userId'));
  // }
  // }

  render() {
    if (!this.userStore.user) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner />
        </div>
      );
    }

    if (!this.userStore.budgetSummaries) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner />
        </div>
      );
    }

    return (
      <div>
        <TopBar />
        <div className={styles.viewContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
