import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import galleryItems from './GalleryData';
import ImageModal from './ImageModal'; // కొత్తగా మోడల్ ను ఇంపోర్ట్ చేయడం
import './GalleryPage.css';

function CategoryGallery() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = galleryItems.filter(item => item.category === decodedCategory);
  
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <h2>{decodedCategory} ఫోటోలు</h2>
      <Link to="/gallery" className="back-btn">
        &lt; గ్యాలరీ వర్గాలకు తిరిగి వెళ్ళు
      </Link>
      
      <div className="gallery-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="gallery-card" onClick={() => handleImageClick(item)}>
              <img src={item.image_url} alt={item.title} className="gallery-image" />
              <div className="image-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items-found">ఈ కేటగిరీలో ఎటువంటి ఫోటోలు దొరకలేదు.</p>
        )}
      </div>
      
      {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
}

export default CategoryGallery;