import React, { FC, ReactNode } from 'react';
import './button.css';

export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'error';
  children?: ReactNode;
  onClick: () => void;
}

const CButton: FC<ButtonProps> = ({ type, onClick, children }) => {
  return (
    <button type='button' className={`Button Button-${type}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default CButton;
