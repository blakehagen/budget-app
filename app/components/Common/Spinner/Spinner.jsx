import React from 'react';
import styles from './spinner.scss';

export default class Spinner extends React.Component {
  render() {
    return (
      <div className={styles.spinner}>
        <div className={styles.bounce1} />
        <div className={styles.bounce2} />
        <div className={styles.bounce3} />
      </div>
    );
  }
}
