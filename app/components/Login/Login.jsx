import React from 'react';
import {hashHistory} from 'react-router';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
import styles from './login.scss';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.hashHistory = hashHistory;

    this.state = {
      email: '',
      password: '',
      isEmailError: false,
      isPasswordError: false,
      loading: false
    };
  }

  render() {

    const inputSection = (
      <div className={styles.box}>
        <div className={styles.titleContainer}>
          <div className={styles.piggybankIcon}></div>
          Budget App
        </div>

        <input className={this.state.isEmailError ? styles.isError : ''} onChange={this.setEmail} type="text" placeholder="Email"/>
        <input className={this.state.isPasswordError ? styles.isError : ''} onChange={this.setPassword} type="password" placeholder="Password"/>
        <div className={styles.loginButton} onClick={this.loginGo}>
          Login
        </div>

        <div className={styles.switchForm} onClick={this.goToRegister}>
          Sign Up
        </div>
      </div>
    );

    const spinner = (
      <div className={styles.box}>
        <div className={styles.titleContainer}>
          <div className={styles.piggybankIcon}></div>
          Budget App
        </div>
        <Spinner/>
      </div>
    );


    return (
      <div className={styles.main}>
        {this.state.loading ? spinner : inputSection}
      </div>
    );
  }

  goToRegister() {
    this.hashHistory.replace('/register');
  }

  setEmail(e) {
    this.setState({email: e.target.value, isEmailError: false});
  }

  setPassword(e) {
    this.setState({password: e.target.value, isPasswordError: false});
  }

  validateLogin() {
    if (this.state.email.length < 1 || this.state.password < 1) {
      if (this.state.email.length < 1) {
        console.log('Email is required');
        this.setState({isEmailError: true});

      }
      if (this.state.password.length < 1) {
        console.log('Password is required');
        this.setState({isPasswordError: true});
      }
      return false;
    }

    // Validate email
    let emailRegex = /^.+@.+\..+$/;
    if (!emailRegex.test(this.state.email)) {
      console.log('Invalid Email');
      this.setState({isEmailError: true});
      return false;
    }

    return true;
  }

  loginGo(e) {
    if (!this.validateLogin()) {
      e.preventDefault();
      return false;
    }

    let loginInfo = {
      email: this.state.email,
      password: this.state.password
    };

    console.log('loginInfo --> ', loginInfo);
    this.setState({loading: true});
  }


}