import React from 'react';
import Modal from 'react-modal';
import Button from '../GeneralButton/GeneralButton'; 

const GeneralModal = ({ 
  isOpen, 
  onRequestClose, 
  onEdit, 
  onDelete, 
  children 
}) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <Button onClick={onRequestClose} className="close-button">
          &times;
        </Button>
      </div>
      <div className="modal-body">
        {children}
      </div>

      <div className="modal-footer">
        <Button onClick={onEdit} className="edit-button">
          Edit Listing
        </Button>
        <Button onClick={onDelete} className="delete-button">
          Delete Listing
        </Button>
      </div>
    </Modal>
  );
};

export default GeneralModal;
