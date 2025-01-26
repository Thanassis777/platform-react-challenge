import { FC, ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryProps {
  children: ReactNode;
}

/**
 * @component
 * A reusable error boundary component to catch and handle JavaScript errors in child components.
 * Displays a fallback UI and logs error details to the console.
 * @param children - The child components to render within the error boundary.
 */
const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => {
  /**
   * Error handler that logs error details to the console.
   * @param error - The error that was thrown.
   * @param errorInfo - Additional error details, including the component stack trace.
   */
  const errorHandler = (error: Error, errorInfo: { componentStack?: string | null }) => {
    console.error('Error caught in ErrorBoundary:', error);
    if (errorInfo.componentStack) {
      console.error('Component Stack:', errorInfo.componentStack);
    }
  };

  /**
   * Renders the fallback UI when an error occurs.
   * @param error - The error that was thrown.
   * @param resetErrorBoundary - Function to reset the error boundary and attempt to re-render.
   */
  const fallbackRender = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  );

  return (
    <ReactErrorBoundary FallbackComponent={fallbackRender} onError={errorHandler}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
