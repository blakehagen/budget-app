import autoBind from 'react-autobind';
import {hashHistory} from 'react-router';

export default class Navigator {
  constructor(userStore) {
    this.userStore = userStore;
    this.history   = hashHistory;
    autoBind(this);
  }

  changeRoute(url, method) {
    console.log('route change!!');
    this.history[method](url);
  }

}