import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorProvider, useError } from './ErrorContext';

// Helper Component to Test `useError`
const TestComponent = () => {
  const { showError } = useError();
  return <button onClick={() => showError('Test error message')}>Trigger Error</button>;
};

const setup = () =>
  render(
    <ErrorProvider>
      <TestComponent />
    </ErrorProvider>
  );

describe('ErrorProvider and useError', () => {
  it('renders children normally', () => {
    // Arrange
    const { getByText } = render(
      <ErrorProvider>
        <div>Child Component</div>
      </ErrorProvider>
    );

    // Act
    const child = getByText('Child Component');

    // Assert
    expect(child).toBeInTheDocument();
  });

  it('displays error message when `showError` is called', () => {
    // Arrange
    setup();

    // Act
    const triggerButton = screen.getByText('Trigger Error');
    fireEvent.click(triggerButton);

    // Assert
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('hides the error message after close button is clicked', () => {
    // Arrange
    setup();

    // Act
    const triggerButton = screen.getByText('Trigger Error');
    fireEvent.click(triggerButton);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Assert
    expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
  });
});
