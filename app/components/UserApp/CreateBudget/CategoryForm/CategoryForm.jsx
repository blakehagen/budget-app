import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'components/formComponents/TextField';
import styles from './categoryForm.scss';

const CategoryForm = (props) => {
  const {
    categoryName,
    categoryLimit,
    handleInput,
    onSave,
    categoryNameError,
    categoryLimitError,
    categoryNameErrorMessage,
    categoryLimitErrorMessage,
  } = props;

  return (
    <div className={styles.wrapper}>
      <TextField
        type="text"
        placeholder="Category Name"
        handleInput={handleInput}
        value={categoryName}
        error={categoryNameError}
        errorText={categoryNameErrorMessage}
        id="Name"
      />

      <TextField
        type="text"
        placeholder="Category Limit ($)"
        handleInput={handleInput}
        value={categoryLimit}
        error={categoryLimitError}
        errorText={categoryLimitErrorMessage}
        id="Limit"
      />

      <button
        className={styles.saveCategory}
        onClick={onSave}
        type="submit"
        name="submit"
      >Add Category to Budget
      </button>

    </div>
  );
};

CategoryForm.propTypes = {
  categoryName: PropTypes.string.isRequired,
  categoryLimit: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  categoryNameError: PropTypes.bool.isRequired,
  categoryLimitError: PropTypes.bool.isRequired,
  categoryNameErrorMessage: PropTypes.string.isRequired,
  categoryLimitErrorMessage: PropTypes.string.isRequired,
};

export default CategoryForm;
