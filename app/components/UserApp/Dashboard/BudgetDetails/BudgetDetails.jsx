import React from 'react';
import {observer, inject} from 'mobx-react';
import DetailsStatus from './DetailsStatus';
import autoBind from 'react-autobind';
import styles from './budgetDetails.scss';

@inject('userStore', 'navigator')
@observer
export default class BudgetDetails extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;
  }

  render() {
    return (
      <div className={styles.budgetDetailsMain}>
        <DetailsStatus/>

      </div>
    );
  }
}