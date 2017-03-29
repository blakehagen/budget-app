import _ from 'lodash';
import {observable, action} from 'mobx';
import autoBind from 'react-autobind';
import userService from 'services/user';
import budgetService from 'services/budget';

export default class UserStore {
  constructor(navigator) {
    autoBind(this);
    this.navigator = navigator;

    this.loadingUser           = false;
    this.loadingBudgets        = false;
    this.loadingNewBudget      = false;
    this.updatingTransactions = false;
    this.user                  = null;
    this.userBudgets           = null;
    this.userId                = localStorage.getItem('userId');
    this.selectedBudget        = null;
    this.showBackArrow         = false;

    if (_.isNull(this.userId)) {
      console.log('no user id');
    }
    else {
      this.getUser(this.userId);
      this.getUserBudgets(this.userId);
      this.navigator.changeRoute(`/user/${this.userId}/dashboard`, 'replace');
    }
  }

  @observable user;
  @observable userId;
  @observable loadingUser;
  @observable userBudgets;
  @observable loadingBudgets;
  @observable selectedBudget;
  @observable updatingTransactions;
  @observable showBackArrow;

  @action
  verifyRouteParam(userId, paramId) {
    if (String(paramId) !== String(userId)) {
      console.log('params check INVALID');
      this.navigator.changeRoute('/login', 'replace');
      return false;
    }
    console.log('params check VALID');
    return true;
  }

  @action
  getUser(userId) {
    if (!userId) {
      console.log('cant get user, no userId');
      this.navigator.changeRoute('/login', 'replace');
      return false;
    }

    this.loadingUser = true;

    userService.getUser(userId)
      .then(response => {
        console.log('getUser response.data --> ', response.data);

        this.loadingUser = false;
        if (_.isError(response) || response.status !== 200) {
          this.navigator.changeRoute('/login', 'replace');
        } else {
          this.user   = response.data;
          this.userId = response.data.id;
        }
      })
      .catch(err => {
        this.loadingUser = false;
        console.error(err);
        this.navigator.changeRoute('/login', 'replace');
      });
  }

  @action
  getUserBudgets(userId) {
    if (!userId) {
      console.log('cant get budgets, no userId');
      this.navigator.changeRoute('/login', 'replace');
      return false;
    }
    this.loadingBudgets = true;

    budgetService.getBudgets(userId)
      .then(response => {
        console.log('got user budgets --> response on user Store --> ', response);
        this.loadingBudgets   = false;
        this.loadingNewBudget = false;
        if (_.isError(response) || response.status !== 200) {
          this.navigator.changeRoute('/login', 'replace');
        } else {
          this.userBudgets = response.data;
          if (this.selectedBudget) {
            this.selectedBudget        = _.find(this.userBudgets, {'id': this.selectedBudget.id});
            this.updatingTransactions = false;
          }
        }
      })
      .catch(err => {
        this.loadingBudgets = false;
        console.error(err);
        this.navigator.changeRoute('/login', 'replace');
      });
  }

  @action
  register(registerInfo) {
    return userService.register(registerInfo)
      .then(response => {
        console.log('response on register --> ', response);
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }

  @action
  login(loginInfo) {
    return userService.login(loginInfo)
      .then(response => {
        console.log('response.data on login --> ', response.data);
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }

  @action
  logout() {
    localStorage.clear();
    this.user   = null;
    this.userId = null;
    this.navigator.changeRoute('/login', 'replace');
    console.log('cleared store/localStorage & logged out');
  }

  @action
  createNewBudget(newBudgetInfo) {
    budgetService.createNewBudget(newBudgetInfo)
      .then(response => {
        console.log('response --> ', response);
        if (response.data.success) {
          this.getUserBudgets(this.userId);
        }
      })
      .catch(err => {
        console.log('err --> ', err.data.error);
      });
  }

  @action
  saveTransaction(transactionInfo) {
    budgetService.saveTransaction(transactionInfo)
      .then(response => {
        console.log('transaction post response --> ', response.data);
        if (response.data.success) {
          this.getUserBudgets(this.userId);
        }
      })
      .catch(err => {
        console.log('err --> ', err.data.error);
      });
  }

  @action
  deleteTransaction(transactionId) {
    budgetService.deleteTransaction(transactionId)
      .then(response => {
        console.log('transaction DELETE response --> ', response.data);
        if (response.data.success) {
          this.getUserBudgets(this.userId);
        }
      })
      .catch(err => {
        console.log('err --> ', err);
      });
  }
}