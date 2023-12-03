import React from 'react';
import { ErrorMsgProps } from '../../types/types';

export const ErrorMsg: React.FC<ErrorMsgProps> = ({ msg }) => {
  return <p className="error-msg">{msg}</p>;
};
