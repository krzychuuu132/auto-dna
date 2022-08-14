import React from 'react';
import { StyledButton } from './Button.styles';

interface ButtonChildren {
  children: JSX.Element[] | JSX.Element | string;
  type?: string;
}
interface ButtonPropsArr {
  type: string;
}

const Button = ({ children }: ButtonChildren, ...props: ButtonPropsArr[]) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
