import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import {Provider} from 'mobx-react';
import App from 'components/App';
import Login from 'components/Login';
import Register from 'components/Register';
import styles from './main.scss';

ReactDOM.render(
  <div className={styles.appBody}>
    <Provider>
      <Router history={hashHistory}>
        <Route path='/' component={App}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path="*" component={App}>
          <IndexRedirect to="/"/>
        </Route>
      </Router>
    </Provider>
  </div>, document.getElementById('app')
);