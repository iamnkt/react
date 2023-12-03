import React from 'react';

type ErrorMsgProps = {
  msg: string;
};

export const ErrorMsg: React.FC<ErrorMsgProps> = ({ msg }) => {
  return <p className="error-msg">{msg}</p>;
};
