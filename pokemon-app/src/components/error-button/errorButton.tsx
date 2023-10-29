import { Component } from 'react';
import { ErrorState } from '../../types/types';

class ErrorButton extends Component {
  public state: ErrorState = { hasError: false };

  public componentDidUpdate({}, prevState: ErrorState): void {
    if (this.state.hasError !== prevState.hasError) {
      throw new Error('Something went wrong');
    }
  }

  public render() {
    return (
      <button
        className="button button__error"
        onClick={() => {
          this.setState({ hasError: true });
        }}
      >
        Error
      </button>
    );
  }
}

export default ErrorButton;
