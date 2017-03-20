import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import {observer, inject} from 'mobx-react';
import autoBind from 'react-autobind';
import styles from './createTransaction.scss';

@inject('userStore', 'navigator')
@observer
export default class CreateTransaction extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;
    this.state     = {
      amount: '',
      vendor: '',
      description: '',
      errorAmount: '',
      errorVendor: '',
      errorDescription: ''
    };
  }

  render() {
    return (
      <div className={styles.formContainer}>
        <span className={styles.title}>New Transaction</span>
        <div className={styles.newTransactionForm}>

          <input className={styles.transactionInput}
                 onChange={this.setAmount}
                 type="text"
                 placeholder="Amount Spent"
                 autoFocus/>
          <div className={styles.errorContainer}>
            {this.state.errorAmount ? this.state.errorAmount : ''}
          </div>

          <input className={styles.transactionInput}
                 onChange={this.setVendor}
                 type="text"
                 placeholder="Vendor Name"/>
          <div className={styles.errorContainer}>
            {this.state.errorVendor ? this.state.errorVendor : ''}
          </div>

          <input className={styles.transactionInput}
                 onChange={this.setDescription}
                 type="text"
                 placeholder="Description"/>
          <div className={styles.errorContainer}>
            {this.state.errorDescription ? this.state.errorDescription : ''}
          </div>

          <input className={styles.saveButton}
                 onClick={this.saveTransaction}
                 type="submit"
                 name="submit"
                 value="Save Transaction"/>
        </div>
      </div>
    );
  }

  setAmount(e) {
    this.setState({amount: e.target.value, errorAmount: ''});
  }

  setVendor(e) {
    this.setState({vendor: e.target.value, errorVendor: ''});
  }

  setDescription(e) {
    this.setState({description: e.target.value, errorDescription: ''});
  }

  validateInputs() {
    if (this.state.amount.length < 1 || this.state.vendor.length < 1 || this.state.description.length < 1) {

      if (this.state.amount.length < 1) {
        this.setState({errorAmount: 'Required'});
      }

      if (this.state.vendor.length < 1) {
        this.setState({errorVendor: 'Required'});
      }

      if (this.state.description.length < 1) {
        this.setState({errorDescription: 'Required'});
      }
      return false;
    }

    const spent = Number(this.state.amount);
    console.log('spent ---> ', spent);

    if (_.isNaN(spent)) {
      this.setState({errorAmount: 'Enter a number'});
      return false;
    }

    if (spent < 0) {
      this.setState({errorAmount: 'Cannot be less than 0'});
      return false;
    }

    return true;
  }

  saveTransaction(e) {
    if (!this.validateInputs()) {
      e.preventDefault();
      console.log('invalid form');
      return false;
    }

    let transactionInfo = {
      PostedByUserId: this.userStore.user.id,
      vendor: this.state.vendor,
      amount: Number(this.state.amount),
      description: this.state.description,
      postedDateHumanized: moment().format('LLLL')
    };

    console.log('transactionInfo --> ', transactionInfo);

    // this.userStore.loadingBudgets = true;
    // this.userStore.createNewBudget(budgetInfo);
    // this.navigator.changeRoute(`/user/${this.userStore.userId}/dashboard`, 'replace');
  }

}