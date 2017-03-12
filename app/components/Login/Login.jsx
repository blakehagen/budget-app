import _ from 'lodash';
import React from 'react';
import {observer, inject} from 'mobx-react';
import autoBind from 'react-autobind';
import Spinner from 'components/Common/Spinner';
import styles from './login.scss';

@inject('userStore', 'navigator')
@observer
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.userStore = this.props.userStore;
    this.navigator = this.props.navigator;

    this.state = {
      email: '',
      password: '',
      isEmailError: false,
      isPasswordError: false,
      loading: false,
      isLoginError: false,
      loginErrorMessage: ''
    };
  }

  render() {

    const inputSection = (
      <div className={styles.box}>
        <div className={styles.titleContainer}>
          <div className={styles.piggybankIcon}></div>
          Budget App
        </div>

        <input className={this.state.isEmailError ? styles.isError : ''}
               onChange={this.setEmail}
               type="text"
               placeholder="Email"/>
        <input className={this.state.isPasswordError ? styles.isError : ''}
               onKeyUp={this.setPassword}
               type="password"
               placeholder="Password"/>

        {this.state.isLoginError ? (
            <div className={styles.errorMessageContainer}>
              {this.state.loginErrorMessage}
            </div>
          ) : null }

        {/*<div className={styles.loginButton} onClick={this.loginGo}>*/}
        {/*Login*/}
        {/*</div>*/}

        <input className={styles.loginButton} onClick={this.loginGo} onKeyUp={this.handleKeyPress} type="submit"
               name="submit" value="Login"/>

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
    this.navigator.changeRoute('/register', 'replace');
  }

  setEmail(e) {
    this.setState({email: e.target.value, isEmailError: false, isLoginError: false});
  }

  setPassword(e) {
    this.setState({password: e.target.value, isPasswordError: false, isLoginError: false});
    if (e.keyCode === 13) {
      this.loginGo(e);
    }
  }

  validateLogin() {
    this.setState({isLoginError: false});

    if (this.state.email.length < 1 || this.state.password < 1) {
      if (this.state.email.length < 1) {
        this.setState({isEmailError: true});

      }
      if (this.state.password.length < 1) {
        this.setState({isPasswordError: true});
      }
      return false;
    }

    let emailRegex = /^.+@.+\..+$/;
    if (!emailRegex.test(this.state.email)) {
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

    this.setState({loading: true, email: '', password: ''});

    this.userStore.login(loginInfo)
      .then(response => {
        if (response.status !== 200) {
          this.setState({
            loading: false,
            isLoginError: true,
            loginErrorMessage: _.get(response.data, 'error', 'Login Failed')
          });
          return false;
        }
        console.log('SUCCESSFUL LOGIN!!');
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('userId', response.data.user.id);

        this.userStore.user   = response.data.user;
        this.userStore.userId = response.data.user.id;
        this.navigator.changeRoute(`/user/${this.userStore.userId}/dashboard`, 'push');
      });
  }

}