import React from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { ProgressBar } from 'react-bootstrap';
import styles from './categories.scss';

const Categories = (props) => {
  const { categories } = props;
  const categoryProgressBars = _.map(categories, ({
    id,
    name,
    limit,
    spent,
  }) => {
    const percentageUsed = (spent / limit) * 100;
    return (
      <div
        key={id}
        className={styles.singleCategoryContainer}
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
            bsStyle={percentageUsed > 85 ? 'danger' : 'success'}
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
};

export default Categories;
