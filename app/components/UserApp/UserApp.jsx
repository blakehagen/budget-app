import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
import TopBar from 'components/TopBar';
import styles from './userApp.scss';

@inject('dataStore', 'navigator')
@observer
export default class UserApp extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;
  }

  componentWillMount() {
    if (!this.dataStore.user) {
      this.dataStore.checkIfStoredSession();
    }
  }

  render() {
    if (this.dataStore.authLoading || !this.dataStore.user) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner />
        </div>
      );
    }

    return (
      <div className={styles.userAppContainer}>
        <TopBar />
        <div className={styles.viewContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
