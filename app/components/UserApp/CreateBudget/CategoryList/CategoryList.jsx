import _ from 'lodash';
import numeral from 'numeral';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './categoryList.scss';

const CategoryList = (props) => {
  const { categories, removeCategory } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        {_.isEmpty(categories) ? 'Add a Category' : 'Categories'}
      </div>
      {!_.isEmpty(categories) && (
        <div className={styles.categoryContainer}>
          {_.map(categories, (category, index) => {
            return (
              <div
                className={styles.categoryCard}
                key={`${category.name}${index}`}
              >
                <div
                  className={styles.close}
                  onClick={() => removeCategory(index)}
                >
                  <div style={{ marginLeft: 1, marginTop: 1 }}>x</div>
                </div>
                <div className={styles.label}>{category.name}</div>
                <div className={styles.label}>{numeral(category.limit).format('$0,0.00')}</div>
              </div>
            );
          })}
        </div>
      )}


    </div>
  );
};
// CategoryForm.propTypes = {
//   error: PropTypes.bool.isRequired,
//   errorText: PropTypes.string.isRequired,
//   handleInput: PropTypes.func.isRequired,
//   id: PropTypes.string.isRequired,
//   placeholder: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
// };

export default CategoryList;
