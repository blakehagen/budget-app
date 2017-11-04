import autoBind from 'react-autobind';
import { browserHistory } from 'react-router';

export default class Navigator {
  constructor() {
    this.history = browserHistory;
    autoBind(this);
  }

  changeRoute(url, method) {
    this.history[method](url);
  }
}
