import _ from 'lodash';
import numeral from 'numeral';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './transactions.scss';

const Transactions = (props) => {
  const { transactions, openDeleteModal } = props;
  const transactionDetails = _.map(transactions, ({
    id,
    vendor,
    amount,
    description,
    postedDate,
  }) => (
    <div
      className={styles.singleTransactionContainer}
      key={id}
    >
      <div className={styles.amountContainer}>
        {numeral(amount).format('$0,0.00')}
        <div className={styles.actionContainer}>

          <div
            className={styles.singleAction}
          >
            <div className={styles.actionText}>Edit</div>
            <div className={styles.editTransactionIcon} />
          </div>

          <div
            className={styles.singleAction}
            onClick={() => openDeleteModal(id, amount)}
          >
            <div className={styles.actionText}>
              Delete
            </div>
            <div className={styles.deleteTransactionIcon} />
          </div>

        </div>
      </div>

      <div className={styles.transactionDetailsContainer}>
        <div className={styles.row}>
          <span className={styles.date}>{postedDate}</span>
        </div>
        <div className={styles.row}>
          {vendor}
        </div>
        <div className={styles.row}>
          <span className={styles.description}>{description}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div className={styles.transactionWrapper}>
      {transactionDetails}
    </div>
  );
};

Transactions.propTypes = {
  transactions: PropTypes.array.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
};

export default Transactions;
