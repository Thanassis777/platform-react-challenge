import { render, screen, fireEvent } from '@testing-library/react';
import ImageCard from './ImageCard';

describe('ImageCard Component', () => {
  const mockSrc = 'https://example.com/image.jpg';
  const mockAlt = 'Test Image';
  const mockOnClick = jest.fn();

  it('renders the placeholder while the image is loading', () => {
    // Arrange
    render(<ImageCard src={mockSrc} alt={mockAlt} />);

    // Act
    const image = screen.getByAltText(mockAlt);

    // Assert
    expect(image).toHaveClass('hidden');
  });

  it('hides the placeholder and shows the image after it loads', async () => {
    // Arrange
    render(<ImageCard src={mockSrc} alt={mockAlt} />);

    // Act
    const image = screen.getByAltText(mockAlt);
    fireEvent.load(image);

    // Assert
    const placeholder = screen.queryByRole('status');
    expect(placeholder).not.toBeInTheDocument();
    expect(image).toHaveClass('visible');
  });

  it('triggers onClick when the card is clicked', () => {
    // Arrange
    render(<ImageCard src={mockSrc} alt={mockAlt} onClick={mockOnClick} />);
    const card = screen.getByRole('img', { hidden: true });

    // Act
    fireEvent.click(card);

    // Assert
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders the correct image with provided src and alt attributes', () => {
    // Arrange
    render(<ImageCard src={mockSrc} alt={mockAlt} />);

    // Act
    const image = screen.getByAltText(mockAlt);

    // Assert
    expect(image).toHaveAttribute('src', mockSrc);
    expect(image).toHaveAttribute('alt', mockAlt);
  });
});
