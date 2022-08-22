import React from 'react';
import PropTypes from 'prop-types';
import { StyledErrorMessage } from './ErrorMessage.styles';
import { FieldError, Message, MultipleFieldErrors, Ref } from 'react-hook-form';

interface ErrorMessageProps {
  type?: string;
  ref?: Ref;
  types?: MultipleFieldErrors;
  message?: any;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <StyledErrorMessage>{message}</StyledErrorMessage>;
};

ErrorMessage.propTypes = {};

export default ErrorMessage;
