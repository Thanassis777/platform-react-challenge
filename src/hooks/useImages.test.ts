import { renderHook, act } from '@testing-library/react';
import { useError } from '../context/ErrorContext';
import { fetchRandomImages } from '../apiClient/apiService';
import useImages from './useImages';
import { ICatImage } from '../definitions';

jest.mock('../context/ErrorContext', () => ({
  useError: jest.fn(),
}));

jest.mock('../apiClient/apiService', () => ({
  fetchRandomImages: jest.fn(),
}));

describe('useImages', () => {
  const mockImages: Partial<ICatImage>[] = [
    { id: '1', url: 'image1.jpg' },
    { id: '2', url: 'image2.jpg' },
  ];
  const mockShowError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useError as jest.Mock).mockReturnValue({ showError: mockShowError });
  });

  it('fetches images on initial load', async () => {
    // Arrange
    (fetchRandomImages as jest.Mock).mockResolvedValue(mockImages);
    const { result } = renderHook(() => useImages());

    // Act
    await act(async () => {
      await result.current.fetchImages();
    });

    // Assert
    expect(result.current.images).toEqual(mockImages);
    expect(result.current.loading).toBe(false);
  });

  it('handles errors when fetchImages fails', async () => {
    // Arrange
    (fetchRandomImages as jest.Mock).mockRejectedValue('Fetch error');
    const { result } = renderHook(() => useImages());

    // Act
    await act(async () => {
      await result.current.fetchImages();
    });

    // Assert
    expect(mockShowError).toHaveBeenCalledWith('Failed to fetch images: Fetch error');
    expect(result.current.loading).toBe(false);
  });

  it('sets loading state correctly during image fetch', async () => {
    // Arrange
    (fetchRandomImages as jest.Mock).mockResolvedValue(mockImages);
    const { result } = renderHook(() => useImages());

    // Act
    act(() => {
      result.current.fetchImages();
    });
    // Assert
    expect(result.current.loading).toBe(true);

    await act(async () => {
      await result.current.fetchImages();
    });
    expect(result.current.loading).toBe(false);
  });
});
