import _ from 'lodash';
import React from 'react';
import {observer, inject} from 'mobx-react';
import {hashHistory} from 'react-router';
import autoBind from 'react-autobind';
import styles from './userHome.scss';

@inject('userStore')
@observer
export default class UserHome extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.hashHistory = hashHistory;
    this.userStore   = this.props.userStore;
  }

  render() {
    return <div>THIS THE USER HOME COMPONENT</div>
  }
}