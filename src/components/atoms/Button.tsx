import React from "react";
import { StyledButton } from "./Button.styles";

interface ButtonProps {
  children: JSX.Element[] | JSX.Element;
}

const Button = ({ children }: ButtonProps) => {
  return <StyledButton>{children}</StyledButton>;
};

export default Button;
