import React from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import styles from './categories.scss';

const Categories = (props) => {
  const { categories, handleClick } = props;
  const categoryProgressBars = _.map(categories, ({
    id,
    name,
    limit,
    spent,
  }) => {
    const percentageUsed = (spent / limit) * 100;

    let progressBarClass;
    if (percentageUsed < 85) {
      progressBarClass = 'success';
    } else if (percentageUsed >= 85 && percentageUsed < 100) {
      progressBarClass = 'warning';
    } else if (percentageUsed >= 100) {
      progressBarClass = 'danger';
    }

    return (
      <div
        key={id}
        className={styles.singleCategoryContainer}
        onClick={() => handleClick(id)}
      >

        <div className={styles.categoryHeader}>
          <span className={styles.headerName}>{name}</span>
          <span className={styles.total}>{numeral(limit).format('$ 0,0[.]00')}</span>
        </div>

        <div className={styles.categoryMain}>
          <ProgressBar
            min={0}
            now={percentageUsed > 100 ? limit : spent}
            max={limit}
            label={percentageUsed > 18 ? numeral(spent).format('$0,0.00') : ''}
            className={styles.progressBar}
            bsStyle={progressBarClass}
          />
        </div>
      </div>
    );
  });

  return (
    <div>
      {categoryProgressBars}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Categories;
