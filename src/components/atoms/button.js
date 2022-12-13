import React from "react";



const Button = ({
  id,
  className,
  clickHandler,
  type,
  disabled,
  value,
  ...props
}) => {
  return (
    <button
      id={id}
      className={className}
      onClick={clickHandler}
      type={type}
      disabled={disabled}
      
    >
      {value}
    </button>
  );
};

Button.defaultProps = {
  type: "button",

 
};

export default Button;
