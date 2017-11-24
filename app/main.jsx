import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'mobx-react';
import DataStore from 'stores/DataStore';
import Navigator from 'utils/Navigator';

// import App from 'components/App';
import Login from 'components/Login';
import Register from 'components/Register';
import UserApp from 'components/UserApp';
import Dashboard from 'components/UserApp/Dashboard';
import BudgetCategoryView from 'components/UserApp/BudgetCategoryView';
import CategoryDetails from 'components/UserApp/CategoryDetails';
// import BudgetDetails from 'components/UserApp/Dashboard/BudgetDetails';
import CreateBudget from 'components/UserApp/CreateBudget';
import CreateTransaction from 'components/UserApp/CreateTransaction';
import styles from './main.scss';

/* Import styles for webpack bundling */
import reactCircularProgressSyles from './styles/lib/react-circular-progressbar.css'; // eslint-disable-line
import reactSelectOverrides from './styles/react-select-overrides.scss'; // eslint-disable-line

const navigator = new Navigator();
const dataStore = new DataStore(navigator);

ReactDOM.render(
  <div className={styles.appBody}>
    <Provider
      dataStore={dataStore}
      navigator={navigator}
    >
      <Router
        history={browserHistory}
        onUpdate={function () {
          handleChange();
        }}
      >
        {/* <Route path="/" component={App}/>*/}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route
          path="/:userId"
          onEnter={paramsCheck()}
          component={UserApp}
        >
          <Route
            path="dashboard"
            onEnter={paramsCheck()}
            component={Dashboard}
          />

          <Route
            path="budget/:budgetId"
            onEnter={paramsCheck()}
          >
            <IndexRoute component={BudgetCategoryView} />
            <Route
              path="category/:categoryId"
              component={CategoryDetails}
            />
          </Route>

          <Route
            path="create-budget"
            onEnter={paramsCheck()}
            component={CreateBudget}
          />
          <Route
            path="new-transaction"
            onEnter={paramsCheck()}
            component={CreateTransaction}
          />
          <IndexRedirect to="/:userId/dashboard" />
        </Route>
        <Route path="*" component={Login}>
          <IndexRedirect to="/login" />
        </Route>
      </Router>
    </Provider>
  </div>, document.getElementById('app'),
);

function handleChange() {
  window.scrollTo(0, 0);
}

function paramsCheck() {
  return (nextState, replace) => {
    if (nextState.params.userId !== String(dataStore.userId)) {
      // Just redirect to current user dashboard instead of logging out...
      replace('/login');
    }
  };
}
