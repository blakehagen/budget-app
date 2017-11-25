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
      amountErrorMessage: '',
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
    this.setState({
      [`selected${selection.key}`]: selection.value,
      [`selected${selection.key}Error`]: false,
    });
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

  validateInputs() {
    const newState = {};
    if (_.isNull(this.state.selectedBudget)) {
      newState.selectedBudgetError = true;
    }

    if (_.isNull(this.state.selectedCategory)) {
      newState.selectedCategoryError = true;
    }

    if (_.trim(this.state.amount).length < 1) {
      newState.amountError = true;
      newState.amountErrorMessage = 'Required';
    }

    if (!newState.amountError) {
      const amountRegex = /^\d*\.?\d*$/;
      if (!amountRegex.test(this.state.amount)) {
        newState.amountError = true;
        newState.amountErrorMessage = 'Must be a number';
      }
    }

    if (!newState.amountError) {
      if (_.toNumber(this.state.amount) <= 0) {
        newState.amountError = true;
        newState.amountErrorMessage = 'Must be greater than 0';
      }
    }

    if (_.trim(this.state.vendor).length < 1) {
      newState.vendorError = true;
    }

    if (_.trim(this.state.description).length < 1) {
      newState.descriptionError = true;
    }

    this.setState({
      selectedBudgetError: newState.selectedBudgetError || false,
      selectedCategoryError: newState.selectedCategoryError || false,
      amountError: newState.amountError || false,
      amountErrorMessage: newState.amountErrorMessage || '',
      vendorError: newState.vendorError || false,
      descriptionError: newState.descriptionError || false,
    });

    if (newState.selectedBudgetError
      || newState.selectedCategoryError
      || newState.amountError
      || newState.descriptionError
      || newState.vendorError
    ) {
      return false;
    }

    return true;
  }

  saveTransaction(e) {
    if (!this.validateInputs()) {
      e.preventDefault();
      console.log('INVALID FORM');
      return false;
    }
    console.log('VALID FORM');

    const transactionInfo = {
      CategoryId: this.state.selectedCategory,
      vendor: _.trim(this.state.vendor),
      amount: _.toNumber(this.state.amount),
      description: _.trim(this.state.description),
      postedDate: moment().format('l h:mma'),
    };

    console.log('transactionInfo -->', transactionInfo);

    // this.dataStore.updatingTransactions = true;
    this.dataStore.saveTransaction(transactionInfo);
    // this.navigator.changeRoute(`/user/${this.dataStore.userId}/budget/${this.state.selectedBudget.id}`, 'push');
  }

  render() {
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
          placeholder="Amount ($)"
          id="amount"
          error={this.state.amountError}
          errorText={this.state.amountErrorMessage}
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
  }
}
