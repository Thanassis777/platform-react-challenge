import { FC, CSSProperties } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Container } from 'react-bootstrap';

import useBreeds from '../../hooks/useBreeds';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import SpinnerComponent from '../../components/SpinnerComponent/SpinnerComponent';
import ImageCard from '../../components/ImageCard/ImageCard';
import { ROUTES } from '../../constants';
import { IBreed } from '../../definitions';

import './Breeds.css';

/**
 * @component
 * A component that displays a list of cat breeds with a virtualized scrollable list.
 * Also, when a breed is selected, a modal opens to show related images for that breed.
 *
 */
const Breeds: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { breeds, selectedBreed, setSelectedBreed, breedImages, loadingBreeds, loadingImages } = useBreeds(id);

  const openBreedModal = (breed: IBreed) => {
    navigate(`${ROUTES.BREEDS}/${breed.id}`);
  };

  const closeModal = () => {
    setSelectedBreed(null);
    navigate(ROUTES.BREEDS);
  };

  /**
   * Renders a single row in the virtualized breed list.
   * @param index - The index of the breed in the list.
   * @param style - The CSS styles applied to the row.
   */
  const renderBreedRow = ({ index, style }: { index: number; style: CSSProperties }) => {
    const breed = breeds[index];

    return (
      <ListGroup.Item
        key={breed.id}
        style={{
          ...style,
        }}
        action
        onClick={() => openBreedModal(breed)}
        className="text-center d-flex justify-content-center align-items-center"
      >
        {breed.name}
      </ListGroup.Item>
    );
  };

  return (
    <Container>
      <h1>Cat Breeds</h1>

      {/* List of Breeds */}
      {loadingBreeds ? (
        <SpinnerComponent />
      ) : (
        <ListGroup>
          <List
            height={880} // Height of the scrollable area
            itemCount={breeds.length} // Total number of items
            itemSize={50} // Height of each row
            width="100%" // Width of the list
            className="no-scrollbar"
          >
            {renderBreedRow}
          </List>
        </ListGroup>
      )}

      {/* Modal for Selected Breed */}
      {selectedBreed && (
        <ModalComponent show={!!selectedBreed} onHide={closeModal} title={selectedBreed?.name}>
          {loadingImages ? (
            <SpinnerComponent />
          ) : (
            <>
              <Row className="justify-content-center">
                <h5>Related cats:</h5>
              </Row>
              <Row xs={1} sm={2} md={2} lg={2} className="g-3 m-3">
                {breedImages.map((image) => (
                  <Col key={image.id}>
                    <ImageCard src={image.url} alt="Breed" onClick={() => navigate(`${ROUTES.IMAGE}/${image.id}`)} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </ModalComponent>
      )}
    </Container>
  );
};

export default Breeds;
