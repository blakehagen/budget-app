import React from 'react';
import {hashHistory} from 'react-router';
import autoBind from 'react-autobind';
import styles from './login.scss';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.hashHistory = hashHistory;

    this.state = {
      email: '',
      password: '',
      loading: false
    };
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.box}>
          <div className={styles.titleContainer}>
            <div className={styles.piggybankIcon}></div>
            Budget App
          </div>

          <input onChange={this.setEmail} type="text" placeholder="Email"/>
          <input onChange={this.setPassword} type="password" placeholder="Password"/>
          <div className={styles.loginButton} onClick={this.loginGo}>
            Login
          </div>

          <div className={styles.switchForm} onClick={this.goToRegister}>
            Sign Up
          </div>

        </div>
      </div>
    )
  }

  goToRegister() {
    this.hashHistory.replace('/register');
  }

  setEmail(e) {
    this.setState({email: e.target.value});
  }

  setPassword(e) {
    this.setState({password: e.target.value});
  }

  loginGo(e){
    console.log('e --> ', e);
    let loginInfo = {
      email: this.state.email,
      password: this.state.password
    };

    console.log('loginInfo --> ', loginInfo);
  }


}