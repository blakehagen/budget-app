import React from 'react';
import {observer, inject} from 'mobx-react';
import DashboardHeader from './DashboadHeader';
import autoBind from 'react-autobind';
import styles from './dashboard.scss';

@inject('userStore', 'navigator')
@observer
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;
  }

  render() {
    return (
      <div>
        <DashboardHeader/>
      </div>
    );
  }

}