import React from 'react';
import './ImageModal.css';

function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <img src={image.image_url} alt={image.title} className="modal-image" />
        <div className="modal-description">
          <h3>{image.title}</h3>
          <p>{image.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;