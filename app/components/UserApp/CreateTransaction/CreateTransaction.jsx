import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
import TextField from 'components/formComponents/TextField';
import SelectField from 'components/formComponents/SelectField';
import styles from './createTransaction.scss';

@inject('dataStore', 'navigator')
@observer
export default class CreateTransaction extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;
    this.state = {
      categoryOptions: [],
      selectedBudget: null,
      selectedBudgetError: false,
      selectedCategory: null,
      selectedCategoryError: false,
      amount: '',
      vendor: '',
      description: '',
      amountError: false,
      vendorError: false,
      descriptionError: false,
    };
  }

  componentWillMount() {
    this.dataStore.showBackArrow = true;
  }

  setSelectedField(selection) {
    // this.dataStore.setCreateNewBudgetError(false);
    if (selection.key === 'Budget') {
      this.buildCategoryOptions(selection.id);
    }
    this.setState({ [`selected${selection.key}`]: selection.value, [`selected${selection.key}Error`]: false });
  }

  buildCategoryOptions(budgetId) {
    this.setState({ selectedCategory: null });
    return this.dataStore.getCategoryList(budgetId)
      .then((categories) => {
        this.setState({ categoryOptions: categories });
      });
  }

  handleInput(e, id) {
    // this.dataStore.setCreateNewBudgetError(false);
    this.setState({
      [id]: e.target.value,
      [`${id}Error`]: false,
    });
  }

  render() {
    console.log('this.state -->', this.state);
    const budgetOptions = _.map(this.dataStore.budgetSummaries, budget => ({
      value: budget.id,
      label: budget.name,
      id: budget.id,
      key: 'Budget',
      clearableValue: false,
    }));

    const form = (
      <div className={styles.createTransactionForm}>
        <SelectField
          label="Select Budget"
          name="Select Budget"
          options={budgetOptions}
          value={this.state.selectedBudget}
          clearable={false}
          searchable={false}
          handleChange={this.setSelectedField}
          error={this.state.selectedBudgetError}
          errorText="Required"
        />

        <SelectField
          label="Select Category"
          name="Select Category"
          options={this.state.categoryOptions}
          value={this.state.selectedCategory}
          clearable={false}
          searchable={false}
          handleChange={this.setSelectedField}
          error={this.state.selectedCategoryError}
          errorText="Required"
        />

        <TextField
          type="text"
          placeholder="Amount"
          id="amount"
          error={this.state.amountError}
          errorText="Required"
          handleInput={this.handleInput}
          value={this.state.name}
        />

        <TextField
          type="text"
          placeholder="Vendor"
          id="vendor"
          error={this.state.vendorError}
          errorText="Required"
          handleInput={this.handleInput}
          value={this.state.name}
        />

        <TextField
          type="text"
          placeholder="Description"
          id="description"
          error={this.state.descriptionError}
          errorText="Required"
          handleInput={this.handleInput}
          value={this.state.name}
        />

        <button
          className={styles.saveButton}
          onClick={this.saveTransaction}
          type="submit"
          name="submit"
        >Save Transaction
        </button>

      </div>
    );

    return (
      <div className={styles.formContainer}>
        <span className={styles.title}>New Transaction</span>
        {this.dataStore.creatingNewBudget ? <Spinner /> : form}
      </div>
    );
        {/*<div className={styles.newTransactionForm}>*/}

          {/*<Select*/}
            {/*placeholder="Select Budget"*/}
            {/*className={styles.selectDropdown}*/}
            {/*name="Select Budget"*/}
            {/*value={this.state.selectedBudget}*/}
            {/*clearable={false}*/}
            {/*searchable={false}*/}
            {/*options={budgetMenuItems}*/}
            {/*onChange={this.setBudget}*/}
          {/*/>*/}
          {/*<div className={styles.errorContainer}>*/}
            {/*{this.state.errorBudget ? this.state.errorBudget : ''}*/}
          {/*</div>*/}

          {/*<input*/}
            {/*className={styles.transactionInput}*/}
            {/*onChange={this.setAmount}*/}
            {/*type="text"*/}
            {/*placeholder="Amount Spent"*/}
          {/*/>*/}
          {/*<div className={styles.errorContainer}>*/}
            {/*{this.state.errorAmount ? this.state.errorAmount : ''}*/}
          {/*</div>*/}

          {/*<input*/}
            {/*className={styles.transactionInput}*/}
            {/*onChange={this.setVendor}*/}
            {/*type="text"*/}
            {/*placeholder="Vendor Name"*/}
          {/*/>*/}
          {/*<div className={styles.errorContainer}>*/}
            {/*{this.state.errorVendor ? this.state.errorVendor : ''}*/}
          {/*</div>*/}

          {/*<input*/}
            {/*className={styles.transactionInput}*/}
            {/*onChange={this.setDescription}*/}
            {/*type="text"*/}
            {/*placeholder="Description"*/}
          {/*/>*/}
          {/*<div className={styles.errorContainer}>*/}
            {/*{this.state.errorDescription ? this.state.errorDescription : ''}*/}
          {/*</div>*/}

          {/*<input*/}
            {/*className={styles.saveButton}*/}
            {/*onClick={this.saveTransaction}*/}
            {/*type="submit"*/}
            {/*name="submit"*/}
            {/*value="Save Transaction"*/}
          {/*/>*/}
        {/*</div>*/}
    // );
  }

  validateInputs() {
    const newState = {};
    if (_.isNull(this.state.selectedBudget)) {
      newState.selectedBudgetError = true;
    }

    if (_.isNull(this.state.selectedCategory)) {
      newState.selectedCategoryError = true;
    }

    this.setState({
      selectedBudgetError: newState.selectedBudgetError || false,
      selectedCategoryError: newState.selectedCategoryError || false,
    });

    if (newState.budgetNameError || newState.recurringError) {
      return false;
    }

    return true;

    // if (!this.state.selectedBudget || this.state.amount.length < 1 || this.state.vendor.length < 1 || this.state.description.length < 1) {
    //   if (!this.state.selectedBudget) {
    //     this.setState({ errorBudget: 'Select a Budget' });
    //   }
    //
    //   if (this.state.amount.length < 1) {
    //     this.setState({ errorAmount: 'Required' });
    //   }
    //
    //   if (this.state.vendor.length < 1) {
    //     this.setState({ errorVendor: 'Required' });
    //   }
    //
    //   if (this.state.description.length < 1) {
    //     this.setState({ errorDescription: 'Required' });
    //   }
    //   return false;
    // }
    //
    // const spent = Number(this.state.amount);
    //
    // if (_.isNaN(spent)) {
    //   this.setState({ errorAmount: 'Enter a number' });
    //   return false;
    // }
    //
    // if (spent < 0) {
    //   this.setState({ errorAmount: 'Cannot be less than 0' });
    //   return false;
    // }
    //
    // return true;
  }

  saveTransaction(e) {
    console.log('saveTransaction!!');

    if (!this.validateInputs()) {
      e.preventDefault();
      console.log('INVALID FORM');
      return false;
    }
    console.log('VALID FORM');

    // const transactionInfo = {
    //   PostedByUserId: this.dataStore.user.id,
    //   BudgetId: this.state.selectedBudget.id,
    //   vendor: this.state.vendor,
    //   amount: Number(this.state.amount),
    //   description: this.state.description,
    //   postedDateHumanized: moment().format('l h:mma'),
    // };
    //
    // this.dataStore.selectedBudget = _.find(this.dataStore.userBudgets, { id: this.state.selectedBudget.id });
    //
    // this.dataStore.updatingTransactions = true;
    // this.dataStore.saveTransaction(transactionInfo);
    // this.navigator.changeRoute(`/user/${this.dataStore.userId}/budget/${this.state.selectedBudget.id}`, 'push');
  }
}
