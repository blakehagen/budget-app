import _ from 'lodash';
import numeral from 'numeral';
import React from 'react';
import { observer, inject } from 'mobx-react';
import autoBind from 'react-autobind';

import CircularProgressbar from 'react-circular-progressbar';

import styles from './budgetCard.scss';

const BudgetCard = (props) => {
  const percentUsed = Math.round((props.spent / props.limit) * 100) || 0;
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {props.name}
      </div>
      <div>
        <CircularProgressbar
          percentage={percentUsed}
        />

        <div className={styles.summaryContentWrapper}>
          <div className={styles.summaryContent}>
            <div className={styles.label}>Limit&nbsp;&nbsp;</div>
            <div className={styles.amount}>{numeral(props.limit).format('$0,0.00')}</div>
          </div>

          <div className={styles.summaryContent}>
            <div className={styles.label}>Spent &nbsp;&nbsp;</div>
            <div className={styles.amount}>{numeral(props.spent).format('$0,0.00')}</div>
          </div>

          <div className={styles.summaryContent}>
            <div className={styles.label}>Remaining &nbsp;&nbsp;</div>
            <div className={styles.amount}>{numeral(props.remaining).format('$0,0.00')}</div>
          </div>

          <div className={styles.buttonWrapper}>
            <button className={styles.cardButton}>
              Details
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
