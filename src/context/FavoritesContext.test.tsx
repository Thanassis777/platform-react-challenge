import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { IFavoriteCatImage } from '../definitions';
import * as apiService from '../apiClient/apiService';
import { ErrorProvider, useError } from './ErrorContext';
import { FavoritesProvider, useFavoritesContext } from './FavoritesContext';

// Mock data
const mockFavorites: Partial<IFavoriteCatImage>[] = [
  { id: '1', image_id: 'img1', image: { id: 'img1', url: 'image1.jpg' } },
  { id: '2', image_id: 'img2', image: { id: 'img2', url: 'image2.jpg' } },
];

jest.mock('../apiClient/apiService');
jest.mock('./ErrorContext');

const TestComponent = () => {
  const { favorites, loading, addFavorite, removeFavorite } = useFavoritesContext();
  return (
    <div>
      {loading && <p>Loading...</p>}
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            {fav.image.url}
            <button onClick={() => removeFavorite(fav.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addFavorite('img3')}>Add Favorite</button>
    </div>
  );
};

const setup = () =>
  render(
    <ErrorProvider>
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    </ErrorProvider>
  );

describe('FavoritesProvider and useFavoritesContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays favorites on mount', async () => {
    // Arrange
    // @ts-ignore
    jest.spyOn(apiService, 'fetchFavoritesData').mockResolvedValue(mockFavorites);

    // Act
    setup();

    // Assert
    await waitFor(() => {
      expect(screen.getByText('image1.jpg')).toBeInTheDocument();
      expect(screen.getByText('image2.jpg')).toBeInTheDocument();
    });
  });

  it('adds a favorite image and refetches favorites', async () => {
    // Arrange
    // @ts-ignore
    jest.spyOn(apiService, 'fetchFavoritesData').mockResolvedValue(mockFavorites);
    // @ts-ignore
    jest.spyOn(apiService, 'addFavoriteImage').mockResolvedValue({});

    // Act
    setup();
    const addButton = screen.getByText('Add Favorite');
    fireEvent.click(addButton);

    // Assert
    await waitFor(() => {
      expect(apiService.addFavoriteImage).toHaveBeenCalledWith('img3');
      expect(apiService.fetchFavoritesData).toHaveBeenCalledTimes(2); // Initial fetch + after add
    });
  });

  it('removes a favorite image and updates the state', async () => {
    // Arrange
    // @ts-ignore
    jest.spyOn(apiService, 'fetchFavoritesData').mockResolvedValue(mockFavorites);
    // @ts-ignore
    jest.spyOn(apiService, 'removeFavoriteImage').mockResolvedValue({});

    // Act
    setup();
    await waitFor(() => screen.getByText('image1.jpg')); // Wait for initial data
    const removeButton = screen.getAllByText('Remove')[0];
    fireEvent.click(removeButton);

    // Assert
    await waitFor(() => {
      expect(apiService.removeFavoriteImage).toHaveBeenCalledWith('1');
      expect(screen.queryByText('image1.jpg')).not.toBeInTheDocument();
    });
  });

  it('displays an error if `fetchFavorites` fails', async () => {
    // Arrange
    const mockShowError = jest.fn();
    jest.spyOn(apiService, 'fetchFavoritesData').mockRejectedValue('Fetch error');
    jest.spyOn(useError(), 'showError').mockImplementation(mockShowError);

    // Act
    setup();

    // Assert
    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith('Failed to fetch favorites: Fetch error');
    });
  });

  it('throws an error if `useFavoritesContext` is used outside of `FavoritesProvider`', () => {
    const InvalidComponent = () => {
      useFavoritesContext(); // This should throw
      return null;
    };

    expect(() => render(<InvalidComponent />)).toThrow('useFavoritesContext must be used within a FavoritesProvider');
  });
});
