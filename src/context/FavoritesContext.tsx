import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IFavoriteCatImage } from '../definitions';
import { addFavoriteImage, fetchFavoritesData, removeFavoriteImage } from '../apiClient/apiService';
import { useError } from './ErrorContext';

/**
 * Interface for the FavoritesContext value.
 */
interface FavoritesContextProps {
  //List of favorite cat images
  favorites: IFavoriteCatImage[];
  //Indicates whether favorites are being loaded.
  loading: boolean;
  addFavorite: (imageId: string) => Promise<void>;
  removeFavorite: (favoriteId: string) => Promise<void>;
}

// Create the FavoritesContext
const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

/**
 * Provides the FavoritesContext to its children and manages favorites state and actions.
 */
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<IFavoriteCatImage[]>([]);
  const [loading, setLoading] = useState(false);
  const { showError } = useError();

  /**
   * Fetches the list of favorite cat images and updates the state.
   */
  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const data = await fetchFavoritesData();
      setFavorites(data);
    } catch (error) {
      showError(`Failed to fetch favorites: ${error || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Adds a favorite image by its ID and updates the favorites list.
   * @param imageId - The ID of the image to add to favorites.
   */
  const addFavorite = async (imageId: string) =>
    addFavoriteImage(imageId)
      .then(() => fetchFavorites())
      .catch((error) => showError(`Failed to add favorite: ${error || 'Unknown error'}`));

  /**
   * Removes a favorite image by its favorite ID and updates the state directly.
   * @param favoriteId - The ID of the favorite to remove.
   */
  const removeFavorite = async (favoriteId: string) => {
    try {
      await removeFavoriteImage(favoriteId);
      setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId)); // Update context state directly
    } catch (error) {
      showError(`Failed to remove favorite: ${error || 'Unknown error'}`);
    }
  };

  useEffect(() => {
    fetchFavorites(); // Fetch favorites only once when the provider mounts
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Custom hook to access the FavoritesContext.
 */
export const useFavoritesContext = (): FavoritesContextProps => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
};
