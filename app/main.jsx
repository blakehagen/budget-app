import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';
import UserStore from 'stores/UserStore';
import Navigator from 'utils/Navigator';

import App from 'components/App';
import Login from 'components/Login';
import Register from 'components/Register';
import UserApp from 'components/UserApp';
import Dashboard from 'components/UserApp/Dashboard';
import BudgetDetails from 'components/UserApp/Dashboard/BudgetDetails';
import CreateBudget from 'components/UserApp/CreateBudget';
import CreateTransaction from 'components/UserApp/CreateTransaction';
import styles from './main.scss';

const navigator = new Navigator();
const userStore = new UserStore(navigator);

ReactDOM.render(
  <div className={styles.appBody}>
    <Provider userStore={userStore} navigator={navigator}>
      <Router history={browserHistory} onUpdate={function () {
        handleChange();
      }}>
        {/*<Route path="/" component={App}/>*/}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/user/:userId"
               onEnter={paramsCheck()}
               component={UserApp}>
          <Route path="dashboard"
                 onEnter={paramsCheck()}
                 component={Dashboard} />
          <Route path="budget/:budgetId"
                 onEnter={paramsCheck()}
                 component={BudgetDetails} />
          <Route path="new-budget"
                 onEnter={paramsCheck()}
                 component={CreateBudget} />
          <Route path="new-transaction"
                 onEnter={paramsCheck()}
                 component={CreateTransaction} />
          <IndexRedirect to="/user/:userId/dashboard" />
        </Route>
        <Route path="*" component={Login}>
          <IndexRedirect to="/login" />
        </Route>
      </Router>
    </Provider>
  </div>, document.getElementById('app')
);

function handleChange() {
  window.scrollTo(0, 0);
}

function paramsCheck() {
  return (nextState, replace) => {
    if (nextState.params.userId !== String(userStore.userId)) {
      replace(`/login`);
    }
  };
}