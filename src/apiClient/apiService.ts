import { IFavoriteCatImage, ICatImage, IBreed } from '../definitions';
import { API_ENDPOINTS } from '../constants';
import axiosInstance from './apiClient';

/**
 * Fetches the list of all cat breeds.
 * @returns A promise that resolves to an array of cat breeds.
 */
export const fetchBreedsData = async (): Promise<IBreed[]> => {
  const response = await axiosInstance.get<IBreed[]>(API_ENDPOINTS.BREEDS);
  return response.data;
};

/**
 * Fetches images for a specific cat breed.
 * @param breedId - The ID of the breed to fetch images for.
 * @returns A promise that resolves to an array of cat images for the specified breed.
 */
export const fetchBreedImagesData = async (breedId: string): Promise<ICatImage[]> => {
  const response = await axiosInstance.get<ICatImage[]>(
    `${API_ENDPOINTS.IMAGES}/search?limit=100&breed_ids=${breedId}`
  );
  return response.data;
};

/**
 * Fetches all favorite cat images.
 * @returns A promise that resolves to an array of favorite cat images.
 */
export const fetchFavoritesData = async (): Promise<IFavoriteCatImage[]> => {
  const response = await axiosInstance.get<IFavoriteCatImage[]>(`${API_ENDPOINTS.FAVORITES}?order=DESC&attach_image=1`);
  return response.data;
};

/**
 * Adds a cat image to the user's favorites.
 * @param imageId - The ID of the image to add to favorites.
 * @returns A promise that resolves when the favorite is added.
 */
export const addFavoriteImage = async (imageId: string): Promise<void> => {
  await axiosInstance.post(API_ENDPOINTS.FAVORITES, { image_id: imageId });
};

/**
 * Removes a cat image from the user's favorites.
 * @param favoriteId - The ID of the favorite to remove.
 * @returns A promise that resolves when the favorite is removed.
 */
export const removeFavoriteImage = async (favoriteId: string): Promise<void> => {
  await axiosInstance.delete(`${API_ENDPOINTS.FAVORITES}/${favoriteId}`);
};

/**
 * Fetches details of a specific cat image by its ID.
 * @param imageId - The ID of the image to fetch.
 * @returns A promise that resolves to the cat image details.
 */
export const fetchImageDataById = async (imageId: string): Promise<ICatImage> => {
  const response = await axiosInstance.get<ICatImage>(`${API_ENDPOINTS.IMAGES}/${imageId}`);
  return response.data;
};

/**
 * Fetches 10 random cat images.
 * @returns A promise that resolves to an array of random cat images.
 */
export const fetchRandomImages = async (): Promise<ICatImage[]> => {
  const response = await axiosInstance.get<ICatImage[]>(`${API_ENDPOINTS.IMAGES}/search?limit=10`);
  return response.data;
};
