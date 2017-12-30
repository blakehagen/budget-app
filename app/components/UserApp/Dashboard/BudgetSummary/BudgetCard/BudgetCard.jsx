import numeral from 'numeral';
import React from 'react';
import PropTypes from 'prop-types';

import CircularProgressbar from 'react-circular-progressbar';

import styles from './budgetCard.scss';

const BudgetCard = (props) => {
  const percentUsed = Math.round((props.spent / props.limit) * 100) || 0;

  let textColor;
  if (percentUsed < 85) {
    textColor = 'underBudget';
  } else if (percentUsed >= 85 && percentUsed < 100) {
    textColor = 'warnBudget';
  } else if (percentUsed >= 100) {
    textColor = 'overBudget';
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.name}>
          {props.name}
        </div>
        <div className={styles.dateInfo}>
          {props.recurring ? props.dateInfo : ''}
        </div>
      </div>

      <div>
        <div className={styles.progressWrapper}>
          <CircularProgressbar
            percentage={percentUsed}
          />
        </div>

        <div className={styles.summaryContentWrapper}>
          <div className={styles.summaryContent}>
            <div className={styles.label}>Limit&nbsp;&nbsp;</div>
            <div className={styles.amount}>{numeral(props.limit).format('$0,0.00')}</div>
          </div>

          <div className={styles.summaryContent}>
            <div className={styles.label}>Spent &nbsp;&nbsp;</div>
            <div className={styles[textColor]}>{numeral(props.spent).format('$0,0.00')}</div>
          </div>

          <div className={styles.summaryContent}>
            <div className={styles.label}>Remaining &nbsp;&nbsp;</div>
            <div className={styles[textColor]}>{numeral(props.remaining).format('$0,0.00')}</div>
          </div>

          <div className={styles.buttonWrapper}>
            <button
              className={styles.cardButton}
              onClick={() => props.details(props.id)}
            >
              Details
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

BudgetCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
  spent: PropTypes.number.isRequired,
  details: PropTypes.func.isRequired,
  recurring: PropTypes.bool.isRequired,
  dateInfo: PropTypes.string,
};

export default BudgetCard;
