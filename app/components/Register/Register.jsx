import _ from 'lodash';
import React from 'react';
import {observer, inject} from 'mobx-react';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
import styles from './register.scss';

@inject('userStore', 'navigator')
@observer
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;

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
      loading: false,
      isSignUpError: false,
      signUpErrorMessage: ''
    };
  }

  render() {

    const inputSection = (
      <div className={styles.box}>
        <div className={styles.titleContainer}>
          <div className={styles.piggybankIcon}></div>
          Budget App
        </div>

        <input className={this.state.isFirstNameError ? styles.isError : ''}
               onChange={this.setFirstName}
               type="text"
               placeholder="First Name"/>
        <input className={this.state.isLastNameError ? styles.isError : ''}
               onChange={this.setLastName}
               type="text"
               placeholder="Last Name"/>
        <input className={this.state.isEmailError ? styles.isError : ''}
               onChange={this.setEmail}
               type="text"
               placeholder="Email"/>
        <input className={this.state.isPasswordError ? styles.isError : ''}
               onChange={this.setPassword}
               type="password"
               placeholder="Password"/>
        <input className={this.state.isConfirmPasswordError ? styles.isError : ''}
               onChange={this.setConfirmPassword}
               type="password"
               placeholder="Confirm Password"/>

        {this.state.isSignUpError ? (
            <div className={styles.errorMessageContainer}>
              {this.state.signUpErrorMessage}
            </div>
          ) : null }

        <input className={styles.registerButton}
               onClick={this.registerGo}
               type="submit"
               name="submit"
               value="Create My Account"/>

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
    this.navigator.changeRoute('/login', 'replace');
  }

  setFirstName(e) {
    this.setState({firstName: e.target.value, isFirstNameError: false, isSignUpError: false});
  }

  setLastName(e) {
    this.setState({lastName: e.target.value, isLastNameError: false, isSignUpError: false});
  }

  setEmail(e) {
    this.setState({email: e.target.value, isEmailError: false, isSignUpError: false});
  }

  setPassword(e) {
    this.setState({password: e.target.value, isPasswordError: false, isSignUpError: false});
  }

  setConfirmPassword(e) {
    this.setState({confirmPassword: e.target.value, isConfirmPasswordError: false, isSignUpError: false});
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

    this.setState({loading: true, password: '', confirmPassword: ''});

    this.userStore.register(registerInfo)
      .then(response => {
        if (response.status !== 200) {
          this.setState({
            loading: false,
            isSignUpError: true,
            signUpErrorMessage: _.get(response.data, 'error', 'Sign Up Failed')
          });
          return false;
        }
        console.log('SUCCESSFUL REGISTRATION!!');
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userId', response.data.user.id);
        this.userStore.getUserBudgets(response.data.user.id);

        this.userStore.user   = response.data.user;
        this.userStore.userId = response.data.user.id;
        this.navigator.changeRoute(`/user/${this.userStore.userId}/dashboard`, 'push');
      });
  }

}