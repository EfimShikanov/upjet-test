'use client';

import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback && this.state.error) {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      return (
        <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Произошла ошибка</AlertTitle>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {this.state.error?.message || 'Неизвестная ошибка'}
            </Typography>

            {process.env.NODE_ENV === 'development' && (
              <details style={{ marginTop: 16 }}>
                <summary>Подробности</summary>
                <pre
                  style={{
                    whiteSpace: 'pre-wrap',
                    fontSize: '12px',
                    marginTop: 8,
                    padding: 8,
                    background: '#f5f5f5',
                    borderRadius: 4,
                  }}
                >
                  {this.state.error?.stack}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </Alert>

          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReset}
          >
            Попробовать снова
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>,
) {
  const WrappedComponent = (props: T) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

export function useErrorHandler() {
  const handleError = (error: Error) => {
    console.error('Handled error:', error);
    throw error;
  };

  return { handleError };
}
