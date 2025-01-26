import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SpinnerComponent from '../../components/SpinnerComponent/SpinnerComponent';
import ImageCard from '../../components/ImageCard/ImageCard';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import { useFavoritesContext } from '../../context/FavoritesContext';
import { ROUTES } from '../../constants';

import './Favorites.css';

/**
 * @component
 * A component to display and manage the user's favorite cat images.
 * Also, Includes functionality for removing favorites.
 */
const Favorites: FC = () => {
  const { favorites, loading, removeFavorite } = useFavoritesContext();
  const navigate = useNavigate();

  const [removingIds, setRemovingIds] = useState<string[]>([]); // Track IDs being removed
  const [selectedFavoriteId, setSelectedFavoriteId] = useState<string | null>(null); // ID of the item to delete

  const handleRemoveFavorite = async (id: string) => {
    setRemovingIds((prev) => [...prev, id]); // Mark as removing

    try {
      await removeFavorite(id);
    } finally {
      setRemovingIds((prev) => prev.filter((favId) => favId !== id));
    }
  };

  const confirmRemoveFavorite = (id: string) => {
    setSelectedFavoriteId(id);
  };

  const proceedWithDeletion = () => {
    if (selectedFavoriteId) {
      handleRemoveFavorite(selectedFavoriteId);
      setSelectedFavoriteId(null);
    }
  };

  const cancelDeletion = () => {
    setSelectedFavoriteId(null);
  };

  return (
    <div>
      <h1 className="text-center">Your Favorite Cats</h1>
      {loading ? (
        <SpinnerComponent />
      ) : favorites.length === 0 ? (
        <h6 className="text-center mt-4">You have no favorite cats yet!</h6>
      ) : (
        <div className="favorites-container">
          {favorites.map((favorite) => (
            <div key={favorite.id} className={`favorite-item ${removingIds.includes(favorite.id) ? 'removing' : ''}`}>
              <ImageCard
                src={favorite.image.url}
                alt="Favorite Cat"
                onClick={() => navigate(`${ROUTES.IMAGE}/${favorite.image.id}`)}
              />
              <button onClick={() => confirmRemoveFavorite(favorite.id)} className="delete-button">
                &times;
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ModalComponent
        show={!!selectedFavoriteId}
        onHide={cancelDeletion}
        title="Confirm Deletion"
        hasFixedHeight={false}
      >
        <p>Are you sure you want to delete this favorite?</p>
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={cancelDeletion}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={proceedWithDeletion}>
            Delete
          </button>
        </div>
      </ModalComponent>
    </div>
  );
};

export default Favorites;
