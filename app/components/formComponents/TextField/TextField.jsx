import React from 'react';
import PropTypes from 'prop-types';
import styles from './textField.scss';

const TextInput = (props) => {
  const { type, placeholder, id, error, errorText, handleInput, value } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.errorContainer}>
        {error ? errorText : ''}
      </div>

      <input
        autoComplete="off"
        className={styles.textField}
        type={type}
        placeholder={placeholder}
        onKeyUp={e => handleInput(e, id)}
        defaultValue={value}
        id={id}
      />
    </div>
  );
};

TextInput.defaultProps = {
  value: '',
};

TextInput.propTypes = {
  error: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default TextInput;
