import { memo } from 'react';
import { Spinner } from 'react-bootstrap';

/**
 * @component
 * A memoized component that displays a centered loading spinner.
 * Used for indicating loading states in the application.
 */
const SpinnerComponent = memo(() => (
  <div className="text-center my-3">
    <Spinner animation="border" variant="primary" data-testid="spinner" />
  </div>
));

export default SpinnerComponent;
