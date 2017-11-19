import React from 'react';
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

  componentWillMount() {
    if (!this.userStore.user) {
      this.userStore.checkIfStoredSession();
    }
  }

  render() {
    if (this.userStore.authLoading || !this.userStore.user) {
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
