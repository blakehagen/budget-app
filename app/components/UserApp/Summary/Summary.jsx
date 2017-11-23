import _ from 'lodash';
import numeral from 'numeral';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './summary.scss';

const Summary = ({ type, name, limit, spent, remaining }) => {
  const percentageUsed = (spent / limit) * 100;
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        {name}
      </div>

      <div className={styles.summary}>
        <span className={styles.summaryNumber}>{numeral(limit).format('$0,0.00')}</span> &nbsp;{_.upperFirst(type)} Limit
      </div>

      <div className={styles.summary}>
        <span className={percentageUsed < 85 ? styles.underBudget : styles.overBudgetWarn}>
          {numeral(spent).format('$0,0.00')}
        </span>
        &nbsp; Spent
      </div>

      <div className={styles.summary}>
        <span className={percentageUsed < 85 ? styles.underBudget : styles.overBudgetWarn}>
          {numeral(Math.abs(remaining)).format('$0,0.00')}
        </span>
        &nbsp; {spent > limit ? 'Over Budget' : 'Remaining'}
      </div>
    </div>
  );
};

Summary.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  spent: PropTypes.number.isRequired,
  remaining: PropTypes.number.isRequired,
};

export default Summary;
