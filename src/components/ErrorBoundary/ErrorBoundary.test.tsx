import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const ProblematicComponent = () => {
    throw new Error('Test error');
  };

  const setup = (children: React.ReactNode) => render(<ErrorBoundary>{children}</ErrorBoundary>);

  it('renders fallback UI when an error is thrown', () => {
    // Arrange
    const { getByText } = setup(<ProblematicComponent />);

    // Act
    const heading = getByText('Something went wrong');
    const message = getByText('Test error');

    // Assert
    expect(heading).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it('renders children normally when no error is thrown', () => {
    // Arrange
    const ChildComponent = () => <div>Safe Component</div>;
    const { getByText } = setup(<ChildComponent />);

    // Act
    const safeContent = getByText('Safe Component');

    // Assert
    expect(safeContent).toBeInTheDocument();
  });
});
