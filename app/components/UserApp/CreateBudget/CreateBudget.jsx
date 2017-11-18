import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { observer, inject } from 'mobx-react';
import Select from 'react-select';
import autoBind from 'react-autobind';
import TextField from 'components/formComponents/TextField';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

import styles from './createBudget.scss';

@inject('userStore', 'navigator')
@observer
export default class CreateBudget extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;
    this.state = {
      budgetName: '',
      recurring: '',
      categoryName: '',
      categoryLimit: '',
      categoryNameError: false,
      categoryLimitError: false,
      categoryNameErrorMessage: '',
      categoryLimitErrorMessage: '',
      budgetCategories: [],
    };
  }

  componentWillMount() {
    // handle on store
    this.userStore.showBackArrow = true;
  }

  setInterval(interval) {
    this.setState({ recurring: interval.value });
  }

  handleCategoryInput(e, id) {
    this.setState({
      [`category${id}`]: e.target.value,
      [`category${id}Error`]: false,
    });
  }

  categorySave() {
    const name = this.state.categoryName;
    const limit = this.state.categoryLimit;

    if (!this.validateCategory(name, limit)) {
      console.log('INVALID category!');
      return false;
    }

    console.log('valid category!');

    this.setState({
      budgetCategories: _.concat(this.state.budgetCategories, {
        name: _.trim(name),
        limit,
      }),
    });

    this.clearCategoryForm();
  }

  handleInput(e, id) {
    this.setState({
      [id]: e.target.value,
      [`${id}Error`]: false,
    });
  }

  clearCategoryForm() {
    this.setState({
      categoryName: '',
      categoryLimit: '',
    });
    // WHY DO I NEED THIS? Only way I could clear form... //
    document.getElementById('Name').value = '';
    document.getElementById('Limit').value = '';
  }

  removeCategory(index) {
    this.state.budgetCategories.splice(index, 1);
    this.setState({ budgetCategories: this.state.budgetCategories });
  }

  validateCategory(name, limit) {
    const newState = {};

    if (_.trim(name).length < 1) {
      newState.categoryNameError = true;
      newState.categoryNameErrorMessage = 'Required';
    }

    if (_.trim(limit).length < 1) {
      newState.categoryLimitError = true;
      newState.categoryLimitErrorMessage = 'Required';
    }

    const limitRegex = /^\d*\.?\d*$/;
    if (!limitRegex.test(limit)) {
      newState.categoryLimitError = true;
      newState.categoryLimitErrorMessage = 'Must be a number';
    }

    this.setState({
      categoryNameError: newState.categoryNameError || false,
      categoryNameErrorMessage: newState.categoryNameErrorMessage || '',
      categoryLimitError: newState.categoryLimitError || false,
      categoryLimitErrorMessage: newState.categoryLimitErrorMessage || '',
    });

    if (newState.categoryNameError || newState.categoryLimitError) {
      return false;
    }

    return true;
  }

  render() {
    console.log('this.state -->', this.state);
    const budgetIntervalOptions = [
      {
        value: true,
        label: 'Recurring (Monthly)',
        clearableValue: false,
      },
      {
        value: false,
        label: 'No Interval',
        clearableValue: false,
      },
    ];

    return (
      <div className={styles.formContainer}>
        <span className={styles.title}>Create New Budget</span>
        <div className={styles.createBudgetForm}>

          <TextField
            type="text"
            placeholder="Budget Name"
            id="name"
            error={this.state.nameError}
            errorText={this.state.nameErrorMessage}
            handleInput={this.handleInput}
            value={this.state.name}
          />

          <Select
            placeholder="Select Budget Interval"
            className={styles.selectDropdown}
            name="Select Budget Interval"
            value={this.state.recurring}
            clearable={false}
            searchable={false}
            options={budgetIntervalOptions}
            onChange={this.setInterval}
          />

          <div className={styles.categoryWrapper}>
            <CategoryList
              categories={this.state.budgetCategories}
              removeCategory={this.removeCategory}
            />

            <CategoryForm
              categoryName={this.state.categoryName}
              categoryLimit={this.state.categoryLimit}
              handleInput={this.handleCategoryInput}
              onSave={this.categorySave}
              categoryNameError={this.state.categoryNameError}
              categoryLimitError={this.state.categoryLimitError}
              categoryNameErrorMessage={this.state.categoryNameErrorMessage}
              categoryLimitErrorMessage={this.state.categoryLimitErrorMessage}
            />
          </div>

          {/*<input*/}
            {/*className={styles.budgetInput}*/}
            {/*onChange={this.setBudgetName}*/}
            {/*type="text"*/}
            {/*placeholder="New Budget Name"*/}
          {/*/>*/}
          {/*<div className={styles.errorContainer}>*/}
            {/*{this.state.errorBudgetName ? this.state.errorBudgetName : ''}*/}
          {/*</div>*/}

          {/*<input*/}
            {/*className={styles.budgetInput}*/}
            {/*onChange={this.setBudgetLimit}*/}
            {/*type="text"*/}
            {/*placeholder="Budget Limit"*/}
          {/*/>*/}
          {/*<div className={styles.errorContainer}>*/}
            {/*{this.state.errorBudgetLimit ? this.state.errorBudgetLimit : ''}*/}
          {/*</div>*/}

          {/*<input*/}
            {/*className={styles.saveButton}*/}
            {/*onClick={this.saveNewBudget}*/}
            {/*type="submit"*/}
            {/*name="submit"*/}
            {/*value="Create New Budget"*/}
          {/*/>*/}

          <button
            className={styles.saveButton}
            onClick={this.saveNewBudget}
            type="submit"
            name="submit"
          >Create Budget
          </button>


        </div>
      </div>
    );
  }

  // setBudgetName(e) {
  //   this.setState({ budgetName: e.target.value, errorBudgetName: '' });
  // }
  //
  // setBudgetLimit(e) {
  //   this.setState({ budgetLimit: e.target.value, errorBudgetLimit: '' });
  // }

  validateInputs() {
    if (this.state.budgetName.length < 1 || this.state.budgetLimit.length < 1) {
      if (this.state.budgetName.length < 1) {
        this.setState({ errorBudgetName: 'Required' });
      }

      if (this.state.budgetLimit.length < 1) {
        this.setState({ errorBudgetLimit: 'Required' });
      }
      return false;
    }

    const limit = Number(this.state.budgetLimit);

    if (_.isNaN(limit)) {
      this.setState({ errorBudgetLimit: 'Enter a number' });
      return false;
    }

    if (limit < 1) {
      this.setState({ errorBudgetLimit: 'Cannot be less than 1' });
      return false;
    }

    return true;
  }

  saveNewBudget(e) {
    console.log('save!');

    // if (!this.validateInputs()) {
    //   e.preventDefault();
    //   return false;
    // }

    // const budgetInfo = {
    //   CreatedByUserId: this.userStore.user.id,
    //   name: this.state.budgetName,
    //   totalAmount: Number(this.state.budgetLimit),
    //   createdDateHumanized: moment().format('L'),
    // };
    //
    // this.userStore.loadingNewBudget = true;
    // this.userStore.createNewBudget(budgetInfo);
    // this.navigator.changeRoute(`/user/${this.userStore.userId}/dashboard`, 'replace');
  }
}
