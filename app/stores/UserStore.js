import _ from 'lodash';
import {observable, action} from 'mobx';
import autoBind from 'react-autobind';
import userService from 'services/user';
import budgetService from 'services/budget';

export default class UserStore {
  constructor(navigator) {
    autoBind(this);
    this.navigator = navigator;

    this.loadingUser = false;
    this.user        = null;
    this.userId      = sessionStorage.getItem('userId');

    if (_.isNull(this.userId)) {
      console.log('no user id');
    }
    else {
      this.getUser(this.userId);
    }
  }

  @observable user;
  @observable userId;
  @observable loadingUser;

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
    sessionStorage.clear();
    this.user   = null;
    this.userId = null;
    this.navigator.changeRoute('/login', 'replace');
    console.log('cleared store/sessionStorage & logged out');
  }

  @action
  createNewBudget(newBudgetInfo) {
    return budgetService.createNewBudget(newBudgetInfo)
      .then(response => {
        console.log('response --> ', response);
        if (response.data.success) {
          // i hate this...
          this.getUser(this.userId);
          return response.data.budget;
        }
      })
      .catch(err => {
        console.log('err --> ', err);
      });
  }
}