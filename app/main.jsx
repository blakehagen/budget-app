import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import {Provider} from 'mobx-react';
import UserStore from 'stores/UserStore';

import App from 'components/App';
import Login from 'components/Login';
import Register from 'components/Register';
import styles from './main.scss';

const userStore = new UserStore();

ReactDOM.render(
  <div className={styles.appBody}>
    <Provider userStore={userStore}>
      <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="*" component={App}>
          <IndexRedirect to="/"/>
        </Route>
      </Router>
    </Provider>
  </div>, document.getElementById('app')
);