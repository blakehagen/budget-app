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

SelectField.defaultProps = {
  value: '',
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  clearable: PropTypes.bool.isRequired,
  searchable: PropTypes.bool.isRequired,
};

export default SelectField;
