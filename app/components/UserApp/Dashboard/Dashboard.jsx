import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import ActionHeader from '../ActionHeader';
import BudgetSummary from './BudgetSummary';

@inject('dataStore', 'navigator')
@observer
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;
  }

  componentWillMount() {
    this.dataStore.setNavArrow(false);
  }

  render() {
    return (
      <div>
        <ActionHeader />
        <BudgetSummary />
      </div>
    );
  }
}
