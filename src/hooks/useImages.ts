import { useCallback, useEffect, useState } from 'react';

import { useError } from '../context/ErrorContext';
import { ICatImage } from '../definitions';
import { fetchRandomImages } from '../apiClient/apiService';

/**
 * Custom hook to manage fetching and state for cat images.
 * @returns Object containing the list of images, a function to fetch images, and the loading state.
 */
const useImages = () => {
  const [images, setImages] = useState<ICatImage[]>([]);
  const [loading, setLoading] = useState(false);

  const { showError } = useError();

  /**
   * Fetches random cat images and updates the state.
   * @param append - Whether to append new images to the existing list. Defaults to `false`.
   */
  const fetchImages = useCallback(
    async (append: boolean = false) => {
      setLoading(true);
      try {
        const data = await fetchRandomImages();
        setImages((prevImages) => (append ? [...prevImages, ...data] : data));
      } catch (error) {
        showError(`Failed to fetch images: ${error || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    },
    [showError]
  );

  // Fetch images on mount
  useEffect(() => {
    fetchImages();
  }, []);

  return { images, fetchImages, loading };
};

export default useImages;
