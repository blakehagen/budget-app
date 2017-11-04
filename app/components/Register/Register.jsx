import _ from 'lodash';
import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import TextField from 'components/formComponents/TextField';
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
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      emailErrorMessage: '',
      passwordErrorMessage: '',
      confirmPasswordErrorMessage: '',
      loading: false,
      // signUpError: false,
      // signUpErrorMessage: '',
    };
  }

  goToLogin() {
    this.navigator.changeRoute('/login', 'replace');
  }

  handleInput(e, id) {
    this.setState({ [id]: e.target.value, [`${id}Error`]: false });
  }

  validateRegister() {
    if (
      this.state.firstName.length < 1
      || this.state.lastName.length < 1
      || this.state.email.length < 1
      || this.state.password < 1
      || this.state.confirmPassword.length < 1
    ) {
      if (this.state.firstName.length < 1) {
        this.setState({ firstNameError: true });
      }

      if (this.state.lastName.length < 1) {
        this.setState({ lastNameError: true });
      }

      if (this.state.email.length < 1) {
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
    if (!this.validateRegister()) {
      e.preventDefault();
      return false;
    }

    const registerInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.setState({ loading: true, password: '', confirmPassword: '' });

    this.userStore.register(registerInfo)
      .then((response) => {
        if (response.status !== 200) {
          this.setState({
            loading: false,
            isSignUpError: true,
            signUpErrorMessage: _.get(response.data, 'error', 'Sign Up Failed'),
          });
          return false;
        }
        console.log('SUCCESSFUL REGISTRATION!!');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.id);
        this.userStore.getUserBudgets(response.data.user.id);

        this.userStore.user = response.data.user;
        this.userStore.userId = response.data.user.id;
        this.navigator.changeRoute(`/user/${this.userStore.userId}/dashboard`, 'push');
      });
  }

  render() {
    const form = (
      <div>
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

        <button
          className={styles.loginButton}
          onClick={this.registerGo}
          type="submit"
          name="submit"
        >Register
        </button>

        <div className={styles.switchForm} >
          <span onClick={this.goToLogin} role="link">Login</span>
        </div>
      </div>
    );

    return (
      <div className={styles.main}>
        <div className={styles.box}>
          <div className={styles.titleContainer}>
            <div className={styles.piggybankIcon} />
            Budget App
          </div>
          {this.state.loading ? <Spinner /> : form}
        </div>
      </div>
    );
  }
}
