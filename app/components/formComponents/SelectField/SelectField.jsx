import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import styles from './selectField.scss';

const SelectField = (props) => {
  const {
    name,
    label,
    error,
    errorText,
    handleChange,
    value,
    options,
    clearable,
    searchable,
  } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.errorContainer}>
        {error ? errorText : ''}
      </div>

      <Select
        className={styles.selectDropdown}
        placeholder={label}
        name={name}
        value={value}
        clearable={clearable}
        searchable={searchable}
        options={options}
        onChange={handleChange}
      />
    </div>
  );
};

// SelectField.propTypes = {
//   error: PropTypes.bool.isRequired,
//   errorText: PropTypes.string.isRequired,
//   handleInput: PropTypes.func.isRequired,
//   id: PropTypes.string.isRequired,
//   placeholder: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
// };

export default SelectField;
