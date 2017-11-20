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
    this.loadingUser = false;
    this.loadingBudgets = false;
    this.loadingNewBudget = false;
    this.updatingTransactions = false;
    this.user = null;
    this.userBudgets = null;
    this.userId = localStorage.getItem('userId');
    this.selectedBudget = null;
    this.showBackArrow = false;
  }

  @observable authLoading;
  @observable budgetSummaries;
  @observable user;
  @observable userId;
  @observable loadingUser;
  @observable userBudgets;
  @observable loadingBudgets;
  @observable selectedBudget;
  @observable updatingTransactions;
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
    this.budgetSummaries = user.budgetSummaries;

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
    budgetService.createNewBudget(newBudgetData)
      .then((response) => {
        if (response.data.success) {
          console.log('response.data on createNewBudget -->', response.data);
          // this.getUserBudgets(this.userId);
        }
      })
      .catch((err) => {
        console.log('err --> ', err.data.error);
      });
  }



  @action
  getUser(userId) {
    if (!userId) {
      this.navigator.changeRoute('/login', 'replace');
      return false;
    }

    this.loadingUser = true;

    userService.getUser(userId)
      .then((response) => {
        this.loadingUser = false;
        if (_.isError(response) || response.status !== 200) {
          this.navigator.changeRoute('/login', 'replace');
        } else {
          this.user = response.data;
          this.userId = response.data.id;
        }
      })
      .catch((err) => {
        this.loadingUser = false;
        console.error(err);
        this.navigator.changeRoute('/login', 'replace');
      });
  }

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
  saveTransaction(transactionInfo) {
    budgetService.saveTransaction(transactionInfo)
      .then((response) => {
        if (response.data.success) {
          this.getUserBudgets(this.userId);
        }
      })
      .catch((err) => {
        console.log('err --> ', err.data.error);
      });
  }

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
