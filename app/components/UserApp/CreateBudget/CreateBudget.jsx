import _ from 'lodash';
import React from 'react';
import {observer, inject} from 'mobx-react';
import autoBind from 'react-autobind';
import styles from './createBudget.scss';

@inject('userStore', 'navigator')
@observer
export default class CreateBudget extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;
  }

  render() {
    return (
      <div>Create new budget!</div>
    );
  }

}