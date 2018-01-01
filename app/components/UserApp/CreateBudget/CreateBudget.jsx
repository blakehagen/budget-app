import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
import TextField from 'components/formComponents/TextField';
import SelectField from 'components/formComponents/SelectField';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';

import styles from './createBudget.scss';

@inject('dataStore', 'navigator')
@observer
export default class CreateBudget extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;
    this.state = {
      budgetName: '',
      budgetNameError: false,
      recurring: null,
      recurringError: false,
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
    this.dataStore.setNavArrow(true);
  }

  setBudgetInterval(interval) {
    this.dataStore.setCreateNewBudgetError(false);
    this.setState({ recurring: interval.value, recurringError: false });
  }

  handleCategoryInput(e, id) {
    this.dataStore.setCreateNewBudgetError(false);
    this.setState({
      [`category${id}`]: e.target.value,
      [`category${id}Error`]: false,
    });
  }

  categorySave() {
    const name = this.state.categoryName;
    const limit = this.state.categoryLimit;

    if (!this.validateCategory(name, limit)) {
      return false;
    }

    this.setState({
      budgetCategories: _.concat(this.state.budgetCategories, {
        name: _.trim(name),
        limit,
      }),
      categoryName: '',
      categoryLimit: '',
    });

    // WHY DO I NEED THIS? Only way I could clear form... //
    document.getElementById('Name').value = '';
    document.getElementById('Limit').value = '';
  }

  handleInput(e, id) {
    this.dataStore.setCreateNewBudgetError(false);
    this.setState({
      [id]: e.target.value,
      [`${id}Error`]: false,
    });
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

    if (!newState.categoryLimitError) {
      const limitRegex = /^\d*\.?\d*$/;
      if (!limitRegex.test(limit)) {
        newState.categoryLimitError = true;
        newState.categoryLimitErrorMessage = 'Must be a number';
      }
    }

    if (!newState.categoryLimitError) {
      if (_.toNumber(limit) < 1) {
        newState.categoryLimitError = true;
        newState.categoryLimitErrorMessage = 'Must be greater than 1';
      }
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

  validateInputs() {
    const newState = {};

    if (_.trim(this.state.budgetName).length < 1) {
      newState.budgetNameError = true;
    }

    if (_.isNull(this.state.recurring)) {
      newState.recurringError = true;
    }

    if (_.isEmpty(this.state.budgetCategories)) {
      newState.categoryLimitError = true;
      newState.categoryLimitErrorMessage = 'Budget must have at least 1 category';
      newState.categoryNameError = true;
      newState.categoryNameErrorMessage = 'Budget must have at least 1 category';
    }

    this.setState({
      budgetNameError: newState.budgetNameError || false,
      recurringError: newState.recurringError || false,
      categoryNameError: newState.categoryNameError || false,
      categoryNameErrorMessage: newState.categoryNameErrorMessage || '',
      categoryLimitError: newState.categoryLimitError || false,
      categoryLimitErrorMessage: newState.categoryLimitErrorMessage || '',
    });

    if (newState.budgetNameError
      || newState.recurringError
      || _.isEmpty(this.state.budgetCategories)) {
      return false;
    }

    return true;
  }

  saveNewBudget(e) {
    if (!this.validateInputs()) {
      e.preventDefault();
      return false;
    }

    const categories = _.clone(this.state.budgetCategories);

    _.forEach(categories, (category) => {
      category.limit = _.toNumber(category.limit);
    });

    const limit = _.reduce(categories, (sum, category) => sum + category.limit, 0);

    const newBudgetData = {
      name: this.state.budgetName,
      status: 'active',
      recurring: this.state.recurring,
      monthYear: null,
      createdDateHumanized: moment().format('L'),
      categories,
    };

    if (newBudgetData.recurring) {
      newBudgetData.monthYear = moment().format('MMMM YYYY');
    }

    this.setState({
      budgetCategories: [],
      budgetName: '',
      recurring: null,
      categoryName: '',
      categoryLimit: '',
    });

    return this.dataStore.createNewBudget(newBudgetData, limit);
  }

  render() {
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

    const form = (
      <div className={styles.createBudgetForm}>

        <TextField
          type="text"
          placeholder="Budget Name"
          id="budgetName"
          error={this.state.budgetNameError}
          errorText="Required"
          handleInput={this.handleInput}
          value={this.state.name}
        />

        <SelectField
          label="Select Budget Interval"
          name="Select Budget Interval"
          value={this.state.recurring}
          clearable={false}
          searchable={false}
          options={budgetIntervalOptions}
          handleChange={this.setBudgetInterval}
          error={this.state.recurringError}
          errorText="Required"
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

        <button
          className={styles.saveButton}
          onClick={this.saveNewBudget}
          type="submit"
          name="submit"
        >Create Budget
        </button>

        {this.dataStore.creatingNewBudgetError && (
          <div className={styles.errorContainer}>
            Error
          </div>
        )}

      </div>
    );

    return (
      <div className={styles.formContainer}>
        <span className={styles.title}>Create New Budget</span>
        {this.dataStore.creatingNewBudget ? <Spinner /> : form}
      </div>
    );
  }
}
