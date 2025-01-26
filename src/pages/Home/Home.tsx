import { useEffect, FC, useState, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';

import useImages from '../../hooks/useImages';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import ImageCard from '../../components/ImageCard/ImageCard';
import { useError } from '../../context/ErrorContext';
import { ICatImage } from '../../definitions';
import { fetchImageDataById } from '../../apiClient/apiService';
import { useFavoritesContext } from '../../context/FavoritesContext';
import ImageDetails from './ImageDetails';
import { ROUTES } from '../../constants';

import './Home.css';

/**
 * @component
 * The Home component is the main page of the application, displaying a grid of cat images.
 * It includes functionality for viewing image details, marking favorites, and pagination for loading more images.
 */
const Home: FC = () => {
  const { images, fetchImages, loading } = useImages();
  const { favorites, addFavorite, removeFavorite } = useFavoritesContext();
  const { showError } = useError();

  const [selectedImage, setSelectedImage] = useState<ICatImage | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  /**
   * Fetches the details of a specific image when its ID is present in the route.
   */
  useEffect(() => {
    if (id) {
      fetchImageDataById(id)
        .then((data) => {
          if (data) {
            const isFav = favorites.some((fav) => fav.image_id === id);

            setSelectedImage(data);
            setIsFavorite(isFav);
            setIsOpenModal(true);
          }
        })
        .catch((error) => {
          showError(`Error fetching image: ${error || 'Unknown error'}`);
          navigate('/');
        });
    }
  }, [id]);

  const openModal = (image: ICatImage) => {
    setSelectedImage(image);
    setIsFavorite(favorites.some((fav) => fav.image_id === image.id));

    navigate(`${ROUTES.IMAGE}/${image.id}`);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedImage(null);

    navigate(`/`);
  };

  const handleFavoriteChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!selectedImage) return;

    const checked = e.target.checked;
    setIsFavorite(checked);

    if (checked) {
      await addFavorite(selectedImage.id);
    } else {
      const favorite = favorites.find((fav) => fav.image_id === selectedImage.id);
      if (favorite) {
        await removeFavorite(favorite.id);
      }
    }
  };

  return (
    <>
      {/* Render Image Grid */}
      <h1 className="text-center">Cat Images</h1>
      <div className="image-grid-container">
        {images.map((image, index) => (
          <ImageCard key={image.id} src={image.url} alt={`Cat ${index + 1}`} onClick={() => openModal(image)} />
        ))}
      </div>
      <Button onClick={() => fetchImages(true)} disabled={loading} className="btn btn-primary mt-2 mb-5">
        {loading ? (
          <>
            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            <span className="mx-2">Loading...</span>
          </>
        ) : (
          'Load More'
        )}
      </Button>

      {/* Render modal with selected image details */}
      {selectedImage && (
        <ModalComponent hasFixedHeight={false} show={isOpenModal} onHide={closeModal} title="Cat Details">
          <img src={selectedImage.url} alt="Selected Cat" className="image-content" />
          {selectedImage.breeds?.[0] ? (
            <ImageDetails breedDetails={selectedImage.breeds[0]} />
          ) : (
            <p className="mt-3">
              <strong>Breed:</strong> Unknown
            </p>
          )}
          <Form className="mt-3">
            <Form.Check
              id="favorite-checkbox"
              type="checkbox"
              label="Mark as favorite"
              checked={isFavorite}
              onChange={handleFavoriteChange}
            />
          </Form>
        </ModalComponent>
      )}
    </>
  );
};

export default Home;
