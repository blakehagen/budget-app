import React from 'react';
import {hashHistory} from 'react-router';
import autoBind from 'react-autobind';
import styles from './register.scss';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.hashHistory = hashHistory;
  }

  render() {
    return (
      <div className={styles.main}>
        <div className={styles.box}>
          <div className={styles.titleContainer}>
            <div className={styles.piggybankIcon}></div>
            Budget App
          </div>

          <input onChange={this.setfirstName} type="text" placeholder="First Name"/>
          <input onChange={this.setlastName} type="text" placeholder="Last Name"/>
          <input onChange={this.setEmail} type="text" placeholder="Email"/>
          <input onChange={this.setPassword} type="password" placeholder="Password"/>
          <input onChange={this.setConfirmPassword} type="password" placeholder="Confirm Password"/>

          <div className={styles.registerButton}>
            Sign Me Up
          </div>

          <div className={styles.switchForm} onClick={this.goToLogin}>
            Login
          </div>
        </div>
      </div>
    )
  }

  goToLogin() {
    this.hashHistory.replace('/login');
  }

}