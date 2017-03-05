import React from 'react';
import {hashHistory} from 'react-router';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
import styles from './register.scss';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.hashHistory = hashHistory;

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isFirstNameError: false,
      isLastNameError: false,
      isEmailError: false,
      isPasswordError: false,
      isConfirmPasswordError: false,
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

        <input className={this.state.isFirstNameError ? styles.isError : ''} onChange={this.setFirstName} type="text" placeholder="First Name"/>
        <input className={this.state.isLastNameError ? styles.isError : ''} onChange={this.setLastName} type="text" placeholder="Last Name"/>
        <input className={this.state.isEmailError ? styles.isError : ''} onChange={this.setEmail} type="text" placeholder="Email"/>
        <input className={this.state.isPasswordError ? styles.isError : ''} onChange={this.setPassword} type="password" placeholder="Password"/>
        <input className={this.state.isConfirmPasswordError ? styles.isError : ''} onChange={this.setConfirmPassword} type="password" placeholder="Confirm Password"/>

        <div className={styles.registerButton} onClick={this.registerGo}>
          Create My Account
        </div>

        <div className={styles.switchForm} onClick={this.goToLogin}>
          Login
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

  goToLogin() {
    this.hashHistory.replace('/login');
  }

  setFirstName(e) {
    this.setState({firstName: e.target.value, isFirstNameError: false});
  }

  setLastName(e) {
    this.setState({lastName: e.target.value, isLastNameError: false});
  }

  setEmail(e) {
    this.setState({email: e.target.value, isEmailError: false});
  }

  setPassword(e) {
    this.setState({password: e.target.value, isPasswordError: false});
  }

  setConfirmPassword(e) {
    this.setState({confirmPassword: e.target.value, isConfirmPasswordError: false});
  }

  validateRegister() {
    if (this.state.firstName.length < 1 || this.state.lastName.length < 1 || this.state.email.length < 1 || this.state.password < 1 || this.state.confirmPassword.length < 1) {

      if (this.state.firstName.length < 1) {
        this.setState({isFirstNameError: true});
      }

      if (this.state.lastName.length < 1) {
        this.setState({isLastNameError: true});
      }

      if (this.state.email.length < 1) {
        this.setState({isEmailError: true});
      }

      if (this.state.password.length < 1) {
        this.setState({isPasswordError: true});
      }

      if (this.state.confirmPassword.length < 1) {
        this.setState({isConfirmPasswordError: true});
      }

      return false;
    }

    // Make sure passwords match
    if (this.state.confirmPassword !== this.state.password) {
      this.setState({isPasswordError: true, isConfirmPasswordError: true});
      return false;
    }

    // Validate email
    let emailRegex = /^.+@.+\..+$/;
    if (!emailRegex.test(this.state.email)) {
      this.setState({isEmailError: true});
      return false;
    }

    return true;
  }

  registerGo(e) {
    if (!this.validateRegister()) {
      e.preventDefault();
      return false;
    }

    let registerInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    console.log('registerInfo --> ', registerInfo);
    this.setState({loading: true});
  }

}