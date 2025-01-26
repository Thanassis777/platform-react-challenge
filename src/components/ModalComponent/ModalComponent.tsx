import { FC, ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

import './ModalComponent.css';

interface ModalComponentProps {
  show: boolean;
  //Whether the modal body should have a fixed height with scroll support.
  hasFixedHeight?: boolean;
  onHide: () => void;
  title: string;
  //The content to display inside the modal.
  children: ReactNode;
}

/**
 * @component
 * A reusable modal component
 *
 * @param show - Controls the visibility of the modal.
 * @param hasFixedHeight - Determines whether the modal body has fixed height (default is `true`).
 * @param onHide - Callback to handle modal close events.
 * @param title - The title displayed in the modal header.
 * @param children - The content rendered inside the modal body.
 *
 */
const ModalComponent: FC<ModalComponentProps> = ({ show, onHide, title, children, hasFixedHeight = true }) => (
  <Modal show={show} onHide={onHide} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body className={hasFixedHeight ? 'modal-body-scroll' : ''}>{children}</Modal.Body>
  </Modal>
);

export default ModalComponent;
