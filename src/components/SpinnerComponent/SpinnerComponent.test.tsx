import { render, screen } from '@testing-library/react';
import SpinnerComponent from './SpinnerComponent';

describe('SpinnerComponent', () => {
  const setup = () => render(<SpinnerComponent />);

  it('renders the spinner', () => {
    // Arrange
    setup();

    // Act
    const spinner = screen.getByTestId('spinner');

    // Assert
    expect(spinner).toBeInTheDocument();
  });

  it('applies correct styling', () => {
    // Arrange
    const { container } = setup();

    // Act
    const spinnerWrapper = container.firstChild;

    // Assert
    expect(spinnerWrapper).toHaveStyle('text-align: center; margin: 20px 0;');
  });
});
