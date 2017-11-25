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
    // this.loadingUser = false;
    this.categoryList = null;
    this.creatingNewBudget = false;
    this.creatingNewBudgetError = false;
    // this.loadingBudgets = false;
    // this.loadingNewBudget = false;
    // this.updatingTransactions = false;
    this.user = null;
    // this.userBudgets = null;
    this.userId = localStorage.getItem('userId');
    this.selectedBudget = null;
    this.selectedBudgetCategoriesLoaded = false;
    this.selectedCategory = null;
    this.selectedCategoryTransactionsLoaded = false;
    this.showBackArrow = false;
  }

  @observable authLoading;
  @observable budgetSummaries;
  @observable categoryList;
  @observable creatingNewBudget;
  @observable creatingNewBudgetError;
  @observable user;
  @observable userId;
  // @observable loadingUser;
  // @observable userBudgets;
  // @observable loadingBudgets;
  @observable selectedBudget;
  @observable selectedBudgetCategoriesLoaded;
  @observable selectedCategory;
  @observable selectedCategoryTransactionsLoaded;
  // @observable updatingTransactions;
  @observable showBackArrow;

  /* ****************************************************************************
    Check User Session
  **************************************************************************** */
  @action
  checkIfStoredSession() {
    this.authLoading = true;
    return userService.checkIfStoredSession()
      .then((response) => {
        console.log('response.data -->', response.data);
        if (response.data.success) {
          this.handleAuthSuccess(localStorage.getItem('token'), response.data.user);
        } else {
          this.authLoading = false;
        }
      })
      .catch((err) => {
        console.log('Error in checkIfStoredSession');
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
    this.userBudgets = null;
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
        console.error(err);
        this.creatingNewBudget = false;
        this.creatingNewBudgetError = true;
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
        console.log('transaction response -->', response.data);
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
    console.log('selectedBudgetSet');
  }

  /* ****************************************************************************
  Clear Selected Budget
  **************************************************************************** */
  @action
  clearSelectedBudget() {
    this.selectedBudget = null;
    this.selectedBudgetCategoriesLoaded = false;
    console.log('SELECTED BUDGET CLEARED');
  }

  /* ****************************************************************************
  Set Selected Category
  **************************************************************************** */
  @action
  setSelectedCategory(categoryId) {
    this.selectedCategory = _.find(_.get(this.selectedBudget, 'categories'), { id: categoryId });
    this.selectedCategory.difference = this.selectedCategory.limit - this.selectedCategory.spent;
    console.log('selectedCategory set');
  }

  /* ****************************************************************************
  Clear Selected Category
  **************************************************************************** */
  @action
  clearSelectedCategory() {
    this.selectedCategory = null;
    this.selectedCategoryTransactionsLoaded = false;
    console.log('SELECTED CATEGORY CLEARED');
  }

  /* ****************************************************************************
  Save New Transaction
  **************************************************************************** */
  @action
  saveTransaction(transaction) {
    budgetService.saveTransaction(transaction)
      .then((response) => {
        if (response.data.success) {
          console.log('transaction response -->', response.data);
          // this.getUserBudgets(this.userId);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /* ****************************************************************************
  Set Nav (Back) Arrow
  **************************************************************************** */
  @action
  setNavArrow(showArrow) {
    this.showBackArrow = showArrow;
  }


  // @action
  // getUser(userId) {
  //   if (!userId) {
  //     this.navigator.changeRoute('/login', 'replace');
  //     return false;
  //   }
  //
  //   this.loadingUser = true;
  //
  //   userService.getUser(userId)
  //     .then((response) => {
  //       this.loadingUser = false;
  //       if (_.isError(response) || response.status !== 200) {
  //         this.navigator.changeRoute('/login', 'replace');
  //       } else {
  //         this.user = response.data;
  //         this.userId = response.data.id;
  //       }
  //     })
  //     .catch((err) => {
  //       this.loadingUser = false;
  //       console.error(err);
  //       this.navigator.changeRoute('/login', 'replace');
  //     });
  // }

  // @action
  // getUserBudgets(userId) {
  //   console.log('hi');
  //   if (!userId) {
  //     this.navigator.changeRoute('/login', 'replace');
  //     return false;
  //   }
  //   this.loadingBudgets = true;
  //
  //   budgetService.getBudgets(userId)
  //     .then((response) => {
  //       this.loadingBudgets = false;
  //       this.loadingNewBudget = false;
  //       if (_.isError(response) || response.status !== 200) {
  //         this.navigator.changeRoute('/login', 'replace');
  //       } else {
  //         this.userBudgets = response.data;
  //         if (this.selectedBudget) {
  //           this.selectedBudget = _.find(this.userBudgets, { id: this.selectedBudget.id });
  //           this.updatingTransactions = false;
  //         }
  //       }
  //     })
  //     .catch((err) => {
  //       this.loadingBudgets = false;
  //       console.error(err);
  //       this.navigator.changeRoute('/login', 'replace');
  //     });
  // }


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
