import { FC, useState } from 'react';
import { Card, Placeholder } from 'react-bootstrap';

import './ImageCard.css';

interface ImageCardProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

/**
 * @component
 * A reusable card component for displaying an image with a loading placeholder.
 * @param src - The source URL of the image to display.
 * @param alt - The alternative text for the image.
 * @param onClick - Optional callback function triggered when the card is clicked.
 *
 */
const ImageCard: FC<ImageCardProps> = ({ src, alt, onClick }) => {
  const [loading, setLoading] = useState(true); // Loading state for image

  return (
    <Card className="image-card" onClick={onClick}>
      {loading && (
        <Placeholder as="div" animation="glow" className="image-placeholder">
          <Placeholder xs={12} />
        </Placeholder>
      )}
      <Card.Img
        variant="top"
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)} // Set loading to false when the image loads
        className={loading ? 'hidden' : 'visible'} // Hide image while loading
      />
    </Card>
  );
};

export default ImageCard;
