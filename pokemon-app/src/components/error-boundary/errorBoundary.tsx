import { Component, ErrorInfo } from 'react';
import { ErrorProps, ErrorState } from '../../types/types';

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  public state: ErrorState = { hasError: false };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(error: Error): ErrorState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
