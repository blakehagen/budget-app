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
    categoryLimitErrorMessage
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

// CategoryForm.propTypes = {
//   error: PropTypes.bool.isRequired,
//   errorText: PropTypes.string.isRequired,
//   handleInput: PropTypes.func.isRequired,
//   id: PropTypes.string.isRequired,
//   placeholder: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
// };

// error={this.state.nameError}
// errorText={this.state.nameErrorMessage}
// handleInput={this.handleInput}
// value={this.state.name}

export default CategoryForm;
