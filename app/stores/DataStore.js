import _ from 'lodash';
import { browserHistory } from 'react-router';
import { observable, action } from 'mobx';
import autoBind from 'react-autobind';
import userService from 'services/user';
import budgetService from 'services/budget';

export default class DataStore {
  constructor(navigator) {
    autoBind(this);
    this.navigator = navigator;

    this.authLoading = false;
    this.budgetSummaries = [];
    this.categoryList = null;
    this.creatingNewBudget = false;
    this.creatingNewBudgetError = false;
    this.creatingNewTransaction = false;
    this.creatingNewTransactionError = false;
    this.selectedBudget = null;
    this.selectedBudgetCategoriesLoaded = false;
    this.selectedCategory = null;
    this.selectedCategoryTransactionsLoaded = false;
    this.showBackArrow = false;
    this.user = null;
    this.userId = localStorage.getItem('userId');
  }

  @observable authLoading;
  @observable budgetSummaries;
  @observable categoryList;
  @observable creatingNewBudget;
  @observable creatingNewBudgetError;
  @observable creatingNewTransaction;
  @observable creatingNewTransactionError;
  @observable selectedBudget;
  @observable selectedBudgetCategoriesLoaded;
  @observable selectedCategory;
  @observable selectedCategoryTransactionsLoaded;
  @observable showBackArrow;
  @observable user;
  @observable userId;

  /* ****************************************************************************
    Check User Session
  **************************************************************************** */
  @action
  checkIfStoredSession() {
    this.authLoading = true;
    return userService.checkIfStoredSession()
      .then((response) => {
        if (response.data.success) {
          this.handleAuthSuccess(localStorage.getItem('token'), response.data.user);
        } else {
          this.authLoading = false;
        }
      })
      .catch((err) => {
        console.error(err);
        this.authLoading = false;
      });
  }

  /* ****************************************************************************
  Loading Auth
  **************************************************************************** */
  @action
  setAuthLoad(isLoading) {
    this.authLoading = isLoading;
  }

  /* ****************************************************************************
  User Signup / Register
  **************************************************************************** */
  @action
  register(registerInfo) {
    return userService.register(registerInfo)
      .then((response) => {
        if (!_.get(response, 'data.success')) {
          this.authLoading = false;
          return false;
        }

        const token = _.get(response, 'data.token');
        const user = _.get(response, 'data.user');

        this.handleAuthSuccess(token, user);
        return { success: _.get(response, 'data.success') };
      })
      .catch((err) => {
        this.authLoading = false;
        return { error: _.get(err, 'response.data.errorMessage', 'Error. Please try again.') };
      });
  }

  /* ****************************************************************************
  User Login
  **************************************************************************** */
  @action
  login(loginInfo) {
    return userService.login(loginInfo)
      .then((response) => {
        if (!_.get(response, 'data.success')) {
          this.authLoading = false;
          return false;
        }

        const token = _.get(response, 'data.token');
        const user = _.get(response, 'data.user');

        this.handleAuthSuccess(token, user);
        return { success: _.get(response, 'data.success') };
      })
      .catch((err) => {
        this.authLoading = false;
        return { error: _.get(err, 'response.data.errorMessage', 'Error. Please try again.') };
      });
  }

  /* ****************************************************************************
  Handle Auth Success
  **************************************************************************** */
  @action
  handleAuthSuccess(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.id);

    this.user = user;
    this.userId = user.id;
    if (_.get(user, 'budgetSummaries')) {
      this.budgetSummaries = user.budgetSummaries;
    }

    const location = browserHistory.getCurrentLocation();
    if (location.pathname !== `/${this.userId}/dashboard`) {
      this.navigator.changeRoute(`/${this.userId}/dashboard`, 'push');
    }
    this.authLoading = false;
  }

  /* ****************************************************************************
  Logout
  **************************************************************************** */
  @action
  logout() {
    localStorage.clear();
    this.user = null;
    this.userId = null;
    this.budgetSummaries = [];
    return userService.logout()
      .then(() => {
        this.navigator.changeRoute('/login', 'replace');
      });
  }

  /* ****************************************************************************
  Create New Budget
  **************************************************************************** */
  @action
  createNewBudget(newBudgetData, limit) {
    this.creatingNewBudget = true;
    budgetService.createNewBudget(newBudgetData)
      .then((response) => {
        if (response.data.success) {
          const newBudgetSummary = response.data.budget;
          newBudgetSummary.budgetLimit = limit;
          newBudgetSummary.difference = limit;

          this.budgetSummaries.unshift(newBudgetSummary);
          this.navigator.changeRoute(`/${this.user.id}/dashboard`, 'replace');
          this.creatingNewBudget = false;
        }
      })
      .catch((err) => {
        this.creatingNewBudget = false;
        this.creatingNewBudgetError = true;
        console.error(err);
      });
  }

  /* ****************************************************************************
  Set Create New Budget ERROR
  **************************************************************************** */
  @action
  setCreateNewBudgetError(isError) {
    this.creatingNewBudgetError = isError;
  }

  /* ****************************************************************************
  Get Budget Category List
  **************************************************************************** */
  @action
  getCategoryList(budgetId) {
    return budgetService.getCategoryList(budgetId)
      .then((response) => {
        if (response.data.success) {
          return _.map(response.data.categories, category => ({
            value: category.id,
            label: category.name,
            id: category.id,
            key: 'Category',
            clearableValue: false,
          }));
        }
        return [];
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /* ****************************************************************************
  Get Budget Category Details
  **************************************************************************** */
  @action
  getBudgetCategories(budgetId) {
    budgetService.getBudgetCategories(budgetId)
      .then((response) => {
        if (response.data.success) {
          const categories = response.data.categories;
          if (this.selectedBudget) {
            this.selectedBudget.categories = categories;
          }
          this.selectedBudgetCategoriesLoaded = true;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /* ****************************************************************************
  Get Transactions for Selected Category
  **************************************************************************** */
  @action
  getCategoryTransactions(categoryId) {
    budgetService.getCategoryTransactions(categoryId)
      .then((response) => {
        if (response.data.success) {
          const transactions = response.data.transactions;
          if (this.selectedCategory) {
            this.selectedCategory.transactions = transactions;
          }
          this.selectedCategoryTransactionsLoaded = true;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /* ****************************************************************************
  Set Selected Budget
  **************************************************************************** */
  @action
  setSelectedBudget(selectedBudgetId) {
    this.selectedBudget = _.find(this.budgetSummaries, { id: selectedBudgetId });
  }

  /* ****************************************************************************
  Update Selected Budget
  **************************************************************************** */
  @action
  updateSelectedBudget(data) {
    const newBudgetSpent = this.selectedBudget.budgetSpent + data.amount;
    const newDifference = this.selectedBudget.budgetLimit - newBudgetSpent;
    const categoryToUpdate = _.find(this.selectedBudget.categories, { id: data.CategoryId });

    _.set(this.selectedBudget, 'budgetSpent', newBudgetSpent);
    _.set(this.selectedBudget, 'difference', newDifference);
    _.set(categoryToUpdate, 'spent', categoryToUpdate.spent + data.amount);
  }

  /* ****************************************************************************
  Clear Selected Budget
  **************************************************************************** */
  @action
  clearSelectedBudget() {
    this.selectedBudget = null;
    this.selectedBudgetCategoriesLoaded = false;
  }

  /* ****************************************************************************
  Set Selected Category
  **************************************************************************** */
  @action
  setSelectedCategory(categoryId) {
    this.selectedCategory = _.find(_.get(this.selectedBudget, 'categories'), { id: categoryId });
    if (this.selectedCategory) {
      this.selectedCategory.difference = this.selectedCategory.limit - this.selectedCategory.spent;
    }
  }

  /* ****************************************************************************
  Clear Selected Category
  **************************************************************************** */
  @action
  clearSelectedCategory() {
    this.selectedCategory = null;
    this.selectedCategoryTransactionsLoaded = false;
  }

  /* ****************************************************************************
  Save New Transaction
  **************************************************************************** */
  @action
  saveTransaction(transaction, budgetId) {
    this.creatingNewTransaction = true;
    budgetService.saveTransaction(transaction)
      .then((response) => {
        if (response.data.success) {
          const newTransaction = response.data.transaction;
          newTransaction.amount = _.toNumber(newTransaction.amount);
          this.setSelectedBudget(budgetId);
          this.updateSelectedBudget(newTransaction);

          this.navigator.changeRoute(`/${this.user.id}/budget/${budgetId}`, 'replace');
          this.creatingNewTransaction = false;
        }
      })
      .catch((err) => {
        this.creatingNewTransaction = false;
        this.creatingNewTransactionError = true;
        console.error(err);
      });
  }

  /* ****************************************************************************
  Set Create New Transaction ERROR
  **************************************************************************** */
  @action
  setCreateNewTransactionError(isError) {
    this.creatingNewTransactionError = isError;
  }

  /* ****************************************************************************
  Set Nav (Back) Arrow
  **************************************************************************** */
  @action
  setNavArrow(showArrow) {
    this.showBackArrow = showArrow;
  }

  // // STILL NEED TO UPDATE BELOW THIS LINE // //
  @action
  deleteTransaction(transactionId) {
    budgetService.deleteTransaction(transactionId)
      .then((response) => {
        if (response.data.success) {
          this.getUserBudgets(this.userId);
        }
      })
      .catch((err) => {
        console.log('err --> ', err);
      });
  }
}
