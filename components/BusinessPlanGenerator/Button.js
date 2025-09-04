// Button.js

import React from 'react';
import { Button as UIButton } from './../ui/button';

const Button = ({ btn_type, onClick, className, children }) => (
  <UIButton type={btn_type} onClick={onClick} className={className}>
    {children}
  </UIButton>
);

export default Button;
