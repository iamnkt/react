import React, { useState } from 'react';

const ErrorButton: React.FC = () => {
  const [hasError, setError] = useState<boolean>(false);

  if (hasError === true) {
    throw new Error('Something went wrong');
  }

  return (
    <button
      data-testid="error-button"
      className="button button__error"
      onClick={() => {
        setError(true);
      }}
    >
      Error
    </button>
  );
};

export default ErrorButton;
