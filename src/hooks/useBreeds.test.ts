import { renderHook, act } from '@testing-library/react';
import { useError } from '../context/ErrorContext';
import { fetchBreedsData, fetchBreedImagesData } from '../apiClient/apiService';
import useBreeds from './useBreeds';

// Mock dependencies
jest.mock('../context/ErrorContext', () => ({
  useError: jest.fn(),
}));

jest.mock('../apiClient/apiService', () => ({
  fetchBreedsData: jest.fn(),
  fetchBreedImagesData: jest.fn(),
}));

describe('useBreeds', () => {
  const mockShowError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useError as jest.Mock).mockReturnValue({ showError: mockShowError });
  });

  it('does not fetch breeds if they are already cached', async () => {
    const mockBreeds = [
      { id: '1', name: 'Breed 1' },
      { id: '2', name: 'Breed 2' },
    ];
    sessionStorage.setItem('breeds', JSON.stringify(mockBreeds));

    const { result } = renderHook(() => useBreeds());

    expect(result.current.breeds).toEqual(mockBreeds);
    expect(fetchBreedsData).not.toHaveBeenCalled();
  });

  it('fetches breed images for a given breed ID', async () => {
    const mockBreedImages = [
      { id: 'img1', url: 'image1.jpg' },
      { id: 'img2', url: 'image2.jpg' },
    ];
    (fetchBreedImagesData as jest.Mock).mockResolvedValue(mockBreedImages);

    const { result } = renderHook(() => useBreeds('1'));

    await act(async () => {
      await result.current.fetchBreedImages('1');
    });

    expect(result.current.breedImages).toEqual(mockBreedImages);
    expect(result.current.loadingImages).toBe(false);
  });

  it('shows an error if fetching breed images fails', async () => {
    (fetchBreedImagesData as jest.Mock).mockRejectedValue('Fetch error');

    const { result } = renderHook(() => useBreeds('1'));

    await act(async () => {
      await result.current.fetchBreedImages('1');
    });

    expect(mockShowError).toHaveBeenCalledWith('Failed to fetch breed images: Fetch error');
    expect(result.current.loadingImages).toBe(false);
  });
});
