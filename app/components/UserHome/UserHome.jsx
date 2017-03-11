import _ from 'lodash';
import React from 'react';
import {reaction} from 'mobx';
import {observer, inject} from 'mobx-react';
import autoBind from 'react-autobind';
import styles from './userHome.scss';

@inject('userStore', 'navigator')
@observer
export default class UserHome extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;
  }

  componentWillMount() {
    if (this.userStore.verifyRouteParam(this.userStore.userId, this.props.params.userId)) {
      if (!this.userStore.user && !this.userStore.loadingUser) {
        this.userStore.getUser(sessionStorage.getItem('userId'));
      }
    }
  }

  render() {
    if (!this.userStore.user) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        THIS THE USER HOME COMPONENT
        <div>Welcome {this.userStore.user.firstName} {this.userStore.user.lastName}</div>
      </div>
    );
  }
}