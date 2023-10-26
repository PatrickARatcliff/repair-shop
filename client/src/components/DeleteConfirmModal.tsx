import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteConfirmModalProps {
  show: boolean;
  onHide: () => void;
  onConfirmDelete: () => void;
  message: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  show,
  onHide,
  onConfirmDelete,
  message,
}) => {
  return (
    <>
      <section aria-label="delete confirmation modal">
        <Modal show={show} onHide={onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
};

export default DeleteConfirmModal;
