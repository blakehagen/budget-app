import _ from 'lodash';
import moment from 'moment';
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
    this.state     = {
      budgetName: '',
      budgetLimit: '',
      errorBudgetName: '',
      errorBudgetLimit: ''
    };
  }

  render() {
    return (
      <div className={styles.formContainer}>
        <span className={styles.title}>Create New Budget</span>
        <div className={styles.createBudgetForm}>

          <input className={styles.budgetInput}
                 onChange={this.setBudgetName}
                 type="text"
                 placeholder="New Budget Name"
                 autoFocus/>
          <div className={styles.errorContainer}>
            {this.state.errorBudgetName ? this.state.errorBudgetName : ''}
          </div>

          <input className={styles.budgetInput}
                 onChange={this.setBudgetLimit}
                 type="text"
                 placeholder="Budget Limit"/>
          <div className={styles.errorContainer}>
            {this.state.errorBudgetLimit ? this.state.errorBudgetLimit : ''}
          </div>

          <input className={styles.saveButton}
                 onClick={this.saveNewBudget}
                 type="submit"
                 name="submit"
                 value="Create New Budget"/>
        </div>
      </div>
    );
  }

  setBudgetName(e) {
    this.setState({budgetName: e.target.value, errorBudgetName: ''});
  }

  setBudgetLimit(e) {
    this.setState({budgetLimit: e.target.value, errorBudgetLimit: ''});
  }

  validateInputs() {
    if (this.state.budgetName.length < 1 || this.state.budgetLimit.length < 1) {

      if (this.state.budgetName.length < 1) {
        this.setState({errorBudgetName: 'Required'});
      }

      if (this.state.budgetLimit.length < 1) {
        this.setState({errorBudgetLimit: 'Required'});
      }
      return false;
    }

    const limit = Number(this.state.budgetLimit);

    if (_.isNaN(limit)) {
      this.setState({errorBudgetLimit: 'Enter a number'});
      return false;
    }

    if (limit < 1) {
      this.setState({errorBudgetLimit: 'Cannot be less than 1'});
      return false;
    }

    return true;
  }

  saveNewBudget(e) {
    if (!this.validateInputs()) {
      e.preventDefault();
      return false;
    }

    let budgetInfo = {
      CreatedByUserId: this.userStore.user.id,
      name: this.state.budgetName,
      totalAmount: Number(this.state.budgetLimit),
      createdDateHumanized: moment().format('L')
    };

    this.userStore.loadingNewBudget = true;
    this.userStore.createNewBudget(budgetInfo);
    this.navigator.changeRoute(`/user/${this.userStore.userId}/dashboard`, 'replace');
  }

}