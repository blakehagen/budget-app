import _ from 'lodash';
import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';
import TextField from 'components/formComponents/TextField';
import Spinner from 'components/Common/Spinner';
import styles from './login.scss';

@inject('dataStore', 'navigator')
@observer
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.dataStore = this.props.dataStore;
    this.navigator = this.props.navigator;

    this.state = {
      email: '',
      password: '',
      emailError: false,
      emailErrorMessage: '',
      passwordError: false,
      loginError: false,
      loginErrorMessage: '',
    };
  }

  componentWillMount() {
    this.dataStore.checkIfStoredSession();
  }

  setAuthLoad(loading) {
    this.dataStore.setAuthLoad(loading);
  }

  goToRegister() {
    this.navigator.changeRoute('/register', 'replace');
  }

  handleInput(e, id) {
    this.setState({
      [id]: e.target.value,
      [`${id}Error`]: false,
      loginError: false,
      loginErrorMessage: '',
    });
  }

  validateLogin() {
    if (this.state.email.length < 1 || this.state.password < 1) {
      if (this.state.email.length < 1) {
        this.setState({ emailError: true, emailErrorMessage: 'Required' });
      }
      if (this.state.password.length < 1) {
        this.setState({ passwordError: true });
      }
      return false;
    }

    const emailRegex = /^.+@.+\..+$/;
    if (!emailRegex.test(this.state.email)) {
      this.setState({ emailError: true, emailErrorMessage: 'Invalid Email' });
      return false;
    }

    return true;
  }

  loginGo(e) {
    e.preventDefault();
    if (!this.validateLogin()) {
      return false;
    }

    this.setAuthLoad(true);

    const loginInfo = {
      email: _.trim(this.state.email),
      password: this.state.password,
    };

    this.setState({ email: '', password: '' });

    return this.dataStore.login(loginInfo)
      .then((response) => {
        if (response.error) {
          this.setState({ loginError: true, loginErrorMessage: response.error });
        }
      });
  }

  render() {
    const form = (
      <form onSubmit={this.loginGo}>
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
          errorText="Required"
          handleInput={this.handleInput}
          value={this.state.password}
        />

        <input
          className={styles.loginButton}
          type="submit"
          value="Login"
        />

        <div className={styles.switchForm}>
          <span onClick={this.goToRegister} role="link">Sign Up</span>
        </div>

        {this.state.loginError && (
          <div className={styles.errContainer}>
            {this.state.loginErrorMessage}
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
