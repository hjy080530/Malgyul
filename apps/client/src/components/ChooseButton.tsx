import React from 'react';

export interface SelectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  font?: string;
}
const ChooseButton: React.FC<SelectButtonProps> = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>;
};

export default ChooseButton;
