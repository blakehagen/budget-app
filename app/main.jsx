import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import {Provider} from 'mobx-react';
import UserStore from 'stores/UserStore';
import Navigator from 'utils/Navigator';

import App from 'components/App';
import Login from 'components/Login';
import Register from 'components/Register';
import UserApp from 'components/UserApp';
import Dashboard from 'components/UserApp/Dashboard';
import CreateBudget from 'components/UserApp/CreateBudget';
import CreateTransaction from 'components/UserApp/CreateTransaction';
import styles from './main.scss';

const navigator = new Navigator();
const userStore = new UserStore(navigator);

ReactDOM.render(
  <div className={styles.appBody}>
    <Provider userStore={userStore} navigator={navigator}>
      <Router history={hashHistory}>
        <Route path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/user/:userId" component={UserApp}>
          <Route path="dashboard" component={Dashboard}/>
          <Route path="new-budget" component={CreateBudget}/>
          <Route path="new-transaction" component={CreateTransaction}/>
        </Route>
        <Route path="*" component={App}>
          <IndexRedirect to="/"/>
        </Route>
      </Router>
    </Provider>
  </div>, document.getElementById('app')
);