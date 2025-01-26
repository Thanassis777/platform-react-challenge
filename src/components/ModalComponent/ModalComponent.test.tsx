import { render, screen, fireEvent } from '@testing-library/react';
import ModalComponent from './ModalComponent';

describe('ModalComponent', () => {
  const mockOnHide = jest.fn();
  const modalTitle = 'Test Modal';
  const modalContent = 'This is a test modal';

  const defaultProps = {
    show: true,
    onHide: mockOnHide,
    title: modalTitle,
    hasFixedHeight: true,
    children: modalContent,
  };

  const setup = (props = {}) => {
    const defaultProps = {
      show: true,
      onHide: mockOnHide,
      title: modalTitle,
      hasFixedHeight: true,
      children: modalContent,
    };

    return render(<ModalComponent {...defaultProps} {...props} />);
  };

  it('renders the modal when `show` is true', () => {
    // Arrange
    setup({ show: true });

    // Act
    const title = screen.getByText(modalTitle);
    const content = screen.getByText(modalContent);

    // Assert
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('does not render the modal when `show` is false', () => {
    // Arrange
    setup({ show: false });

    // Act
    const title = screen.queryByText(modalTitle);
    const content = screen.queryByText(modalContent);

    // Assert
    expect(title).not.toBeInTheDocument();
    expect(content).not.toBeInTheDocument();
  });

  it('calls `onHide` when the close button is clicked', () => {
    // Arrange
    setup();

    // Act
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Assert
    expect(mockOnHide).toHaveBeenCalledTimes(1);
  });

  it('applies the `modal-body-scroll` class when `hasFixedHeight` is true', () => {
    // Arrange
    setup({ hasFixedHeight: true });

    // Act
    const modalBody = screen.getByText(modalContent);

    // Assert
    expect(modalBody).toHaveClass('modal-body-scroll');
  });

  it('does not apply the `modal-body-scroll` class when `hasFixedHeight` is false', () => {
    // Arrange
    setup({ hasFixedHeight: false });

    // Act
    const modalBody = screen.getByText(modalContent);

    // Assert
    expect(modalBody).not.toHaveClass('modal-body-scroll');
  });
});
