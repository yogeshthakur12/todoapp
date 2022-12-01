import React from "react";
import PropTypes from 'prop-types';

const FormInput = ({
    name,
    type,
    placeholder,
    onChange,
    className,
    value,
    error,
    children,
    label,
    defaultValue,
    defaultChecked,
    required,
    ...props
  }) => {
    
    return (
      <React.Fragment>
        <label htmlFor={name}><b>{label}</b></label>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          className={className}
          defaultValue={defaultValue}
          defaultChecked={defaultChecked}
        required={required}
          style={error && {border: 'solid 1px red'}}
        />
        { error && <p>{ error }</p>}
      </React.Fragment>
    )
  }
  
  FormInput.defaultProps = {
    type: "text",
    className: ""
  }
  
  FormInput.propTypes = {
    name: PropTypes.string.isRequired,
   
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'number', 'password','checkbox']),
    className: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
  }
  export default FormInput;

  