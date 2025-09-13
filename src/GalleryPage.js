import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import ImageModal from './ImageModal';
import './GalleryPage.css';

function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAlphabet, setSelectedAlphabet] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gallery');
        setGalleryItems(response.data.galleryItems);
        setCategories(['All', ...new Set(response.data.categories)]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching gallery items:", err);
        setError("గ్యాలరీ ఫోటోలను లోడ్ చేయడంలో లోపం సంభవించింది.");
        setLoading(false);
      }
    };
    fetchGalleryItems();
  }, []);
  
  const filteredGalleryItems = galleryItems.filter(item =>
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (selectedAlphabet === '' || item.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase())) &&
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  
  const closeModal = () => {
    setSelectedImage(null);
  };
  
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedAlphabet('');
    setSearchTerm('');
  };

  if (loading) {
    return <div className="gallery-container">లోడ్ అవుతోంది...</div>;
  }

  if (error) {
    return <div className="gallery-container error-message">{error}</div>;
  }

  return (
    <div className="main-layout">
      <Sidebar 
        onSelectCategory={setSelectedCategory}
        onSelectAlphabet={setSelectedAlphabet}
        categories={categories}
        selectedCategory={selectedCategory}
        selectedAlphabet={selectedAlphabet}
      />
      
      <div className="songs-content">
        <h2>గ్యాలరీ</h2>
        <p className="page-description">
          ఇక్కడ మీరు ఆకర్షణీయమైన ఫోటోలను చూడవచ్చు.
        </p>
        
        <div className="controls-container">
          <input
            type="text"
            placeholder="ఫోటో కోసం వెతకండి..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="reset-btn" onClick={handleResetFilters}>
            ఫిల్టర్‌లను రీసెట్ చేయండి
          </button>
        </div>
        
        <div className="gallery-grid">
          {filteredGalleryItems.length > 0 ? (
            filteredGalleryItems.map((item) => (
              <div key={item._id} className="gallery-card" onClick={() => handleImageClick(item)}>
                <img src={item.image_url} alt={item.title} className="gallery-image" />
                <div className="image-info">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-items-found">ఎటువంటి ఫోటోలు దొరకలేదు.</p>
          )}
        </div>
      </div>
      
      {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
    </div>
  );
}

export default GalleryPage;