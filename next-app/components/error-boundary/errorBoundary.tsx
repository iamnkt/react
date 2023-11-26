import { Component, ErrorInfo } from 'react';
import { ErrorProps, ErrorState } from '../../types/types';

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
  public state: ErrorState = { hasError: false };

  static getDerivedStateFromError(error: Error): ErrorState {
    console.error(error);
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <h1 style={{ textAlign: 'center' }}>Something went wrong</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
