import { useState, useEffect, useCallback } from 'react';
import { useError } from '../context/ErrorContext';
import { IBreed, ICatImage } from '../definitions';
import { fetchBreedImagesData, fetchBreedsData } from '../apiClient/apiService';

const SESSION_STORAGE_KEY = 'breeds';

/**
 * Custom hook to manage breeds and breed-related images.
 * @param breedId - Optional breed ID to fetch specific breed images.
 * @returns Object containing breeds, selectedBreed, breedImages, loading states, and action functions.
 */
const useBreeds = (breedId?: string) => {
  const [breeds, setBreeds] = useState<IBreed[]>(() => {
    const storedBreeds = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return storedBreeds ? JSON.parse(storedBreeds) : [];
  });

  const [selectedBreed, setSelectedBreed] = useState<IBreed | null>(null);
  const [breedImages, setBreedImages] = useState<ICatImage[]>([]);

  const [loadingBreeds, setLoadingBreeds] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);

  const { showError } = useError();

  /**
   * Fetches the list of breeds and caches them in session storage.
   */
  const fetchBreeds = useCallback(async () => {
    if (breeds.length > 0) return; // Avoid fetching if breeds are already loaded

    setLoadingBreeds(true);
    try {
      const data = await fetchBreedsData();
      setBreeds(data);
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(data)); // Cache in session storage
    } catch (error) {
      showError(`Failed to fetch breeds: ${error || 'Unknown error'}`);
    } finally {
      setLoadingBreeds(false);
    }
  }, [breeds, showError]);

  /**
   * Fetches images for a specific breed by its ID.
   * @param breedId - The ID of the breed to fetch images for.
   */
  const fetchBreedImages = useCallback(
    async (breedId: string) => {
      setLoadingImages(true);
      try {
        const data = await fetchBreedImagesData(breedId);
        setBreedImages(data);
      } catch (error) {
        showError(`Failed to fetch breed images: ${error || 'Unknown error'}`);
      } finally {
        setLoadingImages(false);
      }
    },
    [showError]
  );

  // Fetch breeds on mount
  useEffect(() => {
    fetchBreeds();
  }, [fetchBreeds]);

  // Fetch breed images when a specific breed ID is provided (after redirecting usually)
  useEffect(() => {
    if (breedId) {
      const breed = breeds.find((b) => b.id === breedId);
      if (breed) {
        setSelectedBreed(breed);
        fetchBreedImages(breed.id);
      }
    }
  }, [breedId, breeds, fetchBreedImages]);

  return {
    breeds,
    selectedBreed,
    setSelectedBreed,
    breedImages,
    loadingBreeds,
    loadingImages,
    fetchBreedImages,
  };
};

export default useBreeds;
