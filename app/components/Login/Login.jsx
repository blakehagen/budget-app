import React from 'react';
import autoBind from 'react-autobind';
import styles from './login.scss';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
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
          <div className={styles.loginButton}>
            Login
          </div>
        </div>
      </div>
    )
  }


}