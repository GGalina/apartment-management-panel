import React from 'react';

const GeneralButton = ({ onClick, children, className = '', type = 'button' }) => {
  return (
    <button className={`button-${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default GeneralButton;
