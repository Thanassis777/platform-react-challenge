import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound Component', () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

  it('renders the 404 message', () => {
    // Arrange
    const { getByText } = setup();

    // Act
    const heading = getByText('404 - Page Not Found');
    const message = getByText('The page you are looking for does not exist.');

    // Assert
    expect(heading).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it('renders the link to go back to home', () => {
    // Arrange
    const { getByRole } = setup();

    // Act
    const link = getByRole('link', { name: /go back to home/i });

    // Assert
    expect(link).toHaveAttribute('href', '/');
  });
});
