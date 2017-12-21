import _ from 'lodash';
import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import TextField from 'components/formComponents/TextField';
import Spinner from 'components/Common/Spinner';
import styles from './register.scss';

@inject('dataStore', 'navigator')
@observer
export default class Register extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      emailErrorMessage: '',
      passwordErrorMessage: '',
      confirmPasswordErrorMessage: '',
      loading: false,
      signUpError: false,
      signUpErrorMessage: '',
    };
  }

  setAuthLoad(loading) {
    this.dataStore.setAuthLoad(loading);
  }

  goToLogin() {
    this.navigator.changeRoute('/login', 'replace');
  }

  handleInput(e, id) {
    this.setState({
      [id]: e.target.value,
      [`${id}Error`]: false,
      signUpError: false,
      signUpErrorMessage: '',
    });
  }

  validateRegister() {
    if (
      _.trim(this.state.firstName).length < 1
      || _.trim(this.state.lastName).length < 1
      || _.trim(this.state.email).length < 1
      || _.trim(this.state.password).length < 1
      || _.trim(this.state.confirmPassword).length < 1
    ) {
      if (_.trim(this.state.firstName).length < 1) {
        this.setState({ firstNameError: true });
      }

      if (_.trim(this.state.lastName).length < 1) {
        this.setState({ lastNameError: true });
      }

      if (_.trim(this.state.email).length < 1) {
        this.setState({ emailError: true, emailErrorMessage: 'Required' });
      }

      if (this.state.password.length < 1) {
        this.setState({ passwordError: true, passwordErrorMessage: 'Required' });
      }

      if (this.state.confirmPassword.length < 1) {
        this.setState({ confirmPasswordError: true, confirmPasswordErrorMessage: 'Required' });
      }

      return false;
    }

    const emailRegex = /^.+@.+\..+$/;
    if (!emailRegex.test(this.state.email)) {
      this.setState({ emailError: true, emailErrorMessage: 'Invalid Email' });
      return false;
    }

    // Make sure passwords match
    if (this.state.confirmPassword !== this.state.password) {
      this.setState({
        passwordError: true,
        confirmPasswordError: true,
        passwordErrorMessage: 'Passwords do not match',
        confirmPasswordErrorMessage: 'Passwords do not match',
      });
      return false;
    }

    return true;
  }

  registerGo(e) {
    e.preventDefault();
    if (!this.validateRegister()) {
      return false;
    }

    this.setAuthLoad(true);

    const registerInfo = {
      firstName: _.trim(this.state.firstName),
      lastName: _.trim(this.state.lastName),
      email: _.trim(this.state.email),
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.setState({ password: '', confirmPassword: '' });

    return this.dataStore.register(registerInfo)
      .then((response) => {
        if (response.error) {
          this.setState({ signUpError: true, signUpErrorMessage: response.error });
        }
      });
  }

  render() {
    const form = (
      <form onSubmit={this.registerGo}>
        <TextField
          type="text"
          placeholder="First Name"
          id="firstName"
          error={this.state.firstNameError}
          errorText="Required"
          handleInput={this.handleInput}
          value={this.state.firstName}
        />

        <TextField
          type="text"
          placeholder="Last Name"
          id="lastName"
          error={this.state.lastNameError}
          errorText="Required"
          handleInput={this.handleInput}
          value={this.state.lastName}
        />

        <TextField
          type="text"
          placeholder="Email"
          id="email"
          error={this.state.emailError}
          errorText={this.state.emailErrorMessage}
          handleInput={this.handleInput}
          value={this.state.email}
        />

        <TextField
          type="password"
          placeholder="Password"
          id="password"
          error={this.state.passwordError}
          errorText={this.state.passwordErrorMessage}
          handleInput={this.handleInput}
          value={this.state.password}
        />

        <TextField
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          error={this.state.confirmPasswordError}
          errorText={this.state.confirmPasswordErrorMessage}
          handleInput={this.handleInput}
          value={this.state.confirmPassword}
        />

        <input
          className={styles.loginButton}
          type="submit"
          value="Register"
        />

        <div className={styles.switchForm}>
          <span onClick={this.goToLogin} role="link">Login</span>
        </div>

        {this.state.signUpError && (
          <div className={styles.errContainer}>
            {this.state.signUpErrorMessage}
          </div>
        )}

      </form>
    );

    return (
      <div className={styles.main}>
        <div className={styles.box}>
          <div className={styles.titleContainer}>
            <div className={styles.piggybankIcon} />
            Budget App
          </div>
          {this.dataStore.authLoading ? <Spinner /> : form}
        </div>
      </div>
    );
  }
}
