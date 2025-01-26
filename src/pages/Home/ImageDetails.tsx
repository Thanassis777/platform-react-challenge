import React, { FC } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import AccordionComponent, { AccordionItem } from '../../components/AccordionComponent/AccordionComponent';
import { IBreed } from '../../definitions';
import { ROUTES } from '../../constants';

interface ImageDetailsProps {
  breedDetails: IBreed;
}

/**
 * @component
 * A component that displays detailed information about a specific cat breed.
 * They are organized into an accordion with sections for basic info and detailed attributes.
 * @param breedDetails - The breed details to display.
 */
const ImageDetails: FC<ImageDetailsProps> = ({ breedDetails }) => {
  const navigate = useNavigate();

  const accordionItems: AccordionItem[] = [
    {
      eventKey: '0',
      title: 'Basic Information',
      content: (
        <>
          <p>
            <strong>Breed:</strong> {breedDetails.name}
          </p>
          <p>
            <strong>Alternative Names:</strong> {breedDetails?.alt_names || 'N/A'}
          </p>
          <p>
            <strong>Description:</strong> {breedDetails.description}
          </p>
        </>
      ),
    },
    {
      eventKey: '1',
      title: 'Details',
      content: (
        <>
          <p>
            <strong>Life Span:</strong> {breedDetails.life_span} years
          </p>
          <p>
            <strong>Origin:</strong> {breedDetails.origin}
          </p>
          <p>
            <strong>Temperament:</strong> {breedDetails.temperament}
          </p>
          <p>
            <strong>Weight (Imperial):</strong> {breedDetails.weight.imperial} lbs
          </p>
          <p>
            <strong>Weight (Metric):</strong> {breedDetails.weight.metric} kg
          </p>
          <p className="d-flex flex-wrap">
            <strong>Wikipedia info:</strong>
            <a
              style={{ wordBreak: 'break-word', paddingLeft: 5 }}
              rel="noopener noreferrer"
              target="_blank"
              href={breedDetails.wikipedia_url}
            >
              {breedDetails.wikipedia_url}
            </a>
          </p>
          <p>
            <strong>Energy Level:</strong> <ProgressBar animated min={1} max={5} now={breedDetails.energy_level} />
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="my-4">
      <AccordionComponent items={accordionItems} defaultActiveKey="0" />
      <Button variant="dark" onClick={() => navigate(`${ROUTES.BREEDS}/${breedDetails.id}`)} className="mt-3">
        Check related {breedDetails.name} cats
      </Button>
    </div>
  );
};

export default ImageDetails;
