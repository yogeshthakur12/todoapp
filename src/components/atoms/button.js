import React from "react";



const Button = ({
  id,
  className,
  clickHandler,
  type,
  isDisabled,
  value,
  ...props
}) => {
  return (
    <button
      id={id}
      className={className}
      onClick={clickHandler}
      type={type}
      disabled={isDisabled}
      
    >
      {value}
    </button>
  );
};

Button.defaultProps = {
  type: "button",

 
};

export default Button;
