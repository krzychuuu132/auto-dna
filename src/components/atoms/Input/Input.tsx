/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import { StyledInput, StyledInputWrapper, StyledLabel } from './Input.styles';

interface InputProps {
  type: string;
  placeholder?: string;
  alt?: string;
  name?: string;
  label?: string;
  id?: string;
  defaultValue?: any;
}

const Input = React.forwardRef((props: InputProps, ref: any) => {
  const { label, id } = props;
  return (
    <StyledInputWrapper>
      {label ? <StyledLabel htmlFor={id}>{label}</StyledLabel> : null}
      <StyledInput {...props} ref={ref} />
    </StyledInputWrapper>
  );
});
Input.propTypes = {};

export default Input;
