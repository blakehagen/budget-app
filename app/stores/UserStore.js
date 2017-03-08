import _ from 'lodash';
import {observable, action} from 'mobx';
import autoBind from 'react-autobind';
import userService from 'services/user';

export default class UserStore {
  constructor() {
    autoBind(this);
    this.user   = null;
    this.userId = sessionStorage.getItem('userId');
  }

  @observable user;

  @action
  login(loginInfo) {
    return userService.login(loginInfo)
      .then(response => {
        return response;
      })
      .catch(err => {
        return err.response;
      });
  }

}