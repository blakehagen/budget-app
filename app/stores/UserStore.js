import _ from 'lodash';
import { observable, action } from 'mobx';
import autoBind from 'react-autobind';
import userService from 'services/user';
import budgetService from 'services/budget';

export default class UserStore {
  constructor(navigator) {
    autoBind(this);
    this.navigator = navigator;

    this.authLoading = false;
    this.loadingUser = false;
    this.loadingBudgets = false;
    this.loadingNewBudget = false;
    this.updatingTransactions = false;
    this.user = null;
    this.userBudgets = null;
    this.userId = localStorage.getItem('userId');
    this.selectedBudget = null;
    this.showBackArrow = false;

    if (!_.isNull(this.userId)) {
      this.getUser(this.userId);
      this.getUserBudgets(this.userId);
      this.navigator.changeRoute(`/user/${this.userId}/dashboard`, 'replace');
    }
  }

  @observable authLoading;
  @observable user;
  @observable userId;
  @observable loadingUser;
  @observable userBudgets;
  @observable loadingBudgets;
  @observable selectedBudget;
  @observable updatingTransactions;
  @observable showBackArrow;

  @action
  setAuthLoad(isLoading) {
    this.authLoading = isLoading;
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

  @action
  getUserBudgets(userId) {
    if (!userId) {
      this.navigator.changeRoute('/login', 'replace');
      return false;
    }
    this.loadingBudgets = true;

    budgetService.getBudgets(userId)
      .then((response) => {
        this.loadingBudgets = false;
        this.loadingNewBudget = false;
        if (_.isError(response) || response.status !== 200) {
          this.navigator.changeRoute('/login', 'replace');
        } else {
          this.userBudgets = response.data;
          if (this.selectedBudget) {
            this.selectedBudget = _.find(this.userBudgets, { id: this.selectedBudget.id });
            this.updatingTransactions = false;
          }
        }
      })
      .catch((err) => {
        this.loadingBudgets = false;
        console.error(err);
        this.navigator.changeRoute('/login', 'replace');
      });
  }

  @action
  register(registerInfo) {
    return userService.register(registerInfo)
      .then(response => response)
      .catch(err => err.response);
  }

  @action
  login(loginInfo) {
    return userService.login(loginInfo)
      .then((response) => {
        console.log('response -->', response);

        if (!_.get(response, 'data.success')) {
          this.authLoading = false;
          return false;
        }
        console.log('SUCCESSFUL LOGIN!!');
        localStorage.setItem('token', _.get(response, 'data.token'));
        localStorage.setItem('userId', _.get(response, 'data.user.id'));
        this.getUserBudgets(_.get(response, 'data.user.id'));

        this.user = response.data.user;
        this.userId = response.data.user.id;
        this.navigator.changeRoute(`/user/${this.userId}/dashboard`, 'push');
        this.authLoading = false;
        return { success: _.get(response, 'data.success') };
      })
      .catch((err) => {
        this.authLoading = false;
        return { error: _.get(err, 'response.data.errorMessage', 'Error. Please try again.') };
      });
  }

  @action
  logout() {
    // need to logout of session!
    localStorage.clear();
    this.user = null;
    this.userId = null;
    this.navigator.changeRoute('/login', 'replace');
  }

  @action
  createNewBudget(newBudgetInfo) {
    budgetService.createNewBudget(newBudgetInfo)
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
