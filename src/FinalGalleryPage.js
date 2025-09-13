import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { galleryCategories } from './GalleryData';
import ImageModal from './ImageModal';
import './GalleryPage.css';

function FinalGalleryPage() {
  const { categoryName, subName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const decodedSubcategory = decodeURIComponent(subName);

  const mainCategory = galleryCategories.find(cat => cat.name === decodedCategory);
  const subcategory = mainCategory?.subcategories.find(sub => sub.name === decodedSubcategory);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const closeModal = () => {
    setSelectedImage(null);
  };

  if (!subcategory) {
    return <p className="no-items-found">ఈ గ్యాలరీ దొరకలేదు.</p>;
  }

  return (
    <div className="gallery-container">
      <h2>{subcategory.name}</h2>
      <Link to={`/gallery/${categoryName}`} className="back-btn">
        &lt; {decodedCategory} వర్గానికి తిరిగి వెళ్ళు
      </Link>
      
      <div className="gallery-grid">
        {subcategory.items.length > 0 ? (
          subcategory.items.map(item => (
            <div key={item.id} className="gallery-card" onClick={() => handleImageClick(item)}>
              <img src={item.image_url} alt={item.description} className="gallery-image" />
              <div className="image-info">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items-found">ఈ గ్యాలరీలో ఎటువంటి ఫోటోలు దొరకలేదు.</p>
        )}
      </div>
      
      {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
}

export default FinalGalleryPage;