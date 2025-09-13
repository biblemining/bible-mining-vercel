import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './GalleryPage.css';

function SubcategoryPage() {
  const { mainCategoryName } = useParams();
  const decodedMainCategory = decodeURIComponent(mainCategoryName);

  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('https://bible-mining-backend.onrender.com');
        const allItems = response.data.galleryItems;
        const filteredItems = allItems.filter(item => item.main_category === decodedMainCategory);
        const uniqueSubcategories = [...new Set(filteredItems.map(item => item.subcategory))];
        setSubcategories(uniqueSubcategories);
        setLoading(false);
      } catch (err) {
        setError("ఉపవర్గాలను లోడ్ చేయడంలో లోపం సంభవించింది.");
        setLoading(false);
      }
    };
    fetchSubcategories();
  }, [decodedMainCategory]);

  if (loading) {
    return <div className="gallery-container">లోడ్ అవుతోంది...</div>;
  }

  if (error) {
    return <div className="gallery-container error-message">{error}</div>;
  }

  return (
    <div className="gallery-container">
      <h2>{decodedMainCategory}</h2>
      <p className="page-description">
        మీరు వీక్షించడానికి అందుబాటులో ఉన్న ఉపవర్గాలను ఎంచుకోండి.
      </p>
      
      <Link to="/gallery" className="back-btn">
        &lt; ప్రధాన వర్గాలకు తిరిగి వెళ్ళు
      </Link>
      
      <div className="category-grid">
        {subcategories.length > 0 ? (
          subcategories.map(sub => (
            <Link key={sub} to={`/gallery/${encodeURIComponent(decodedMainCategory)}/${encodeURIComponent(sub)}`} className="category-card-link">
              <div className="category-card-item"> {/* You can add cover image here if you have one */}
                <div className="category-card-overlay">
                  <h3>{sub}</h3>
                  <p>గ్యాలరీ చూడండి</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-items-found">ఈ ప్రధాన వర్గంలో ఎటువంటి ఉపవర్గాలు దొరకలేదు.</p>
        )}
      </div>
    </div>
  );
}

export default SubcategoryPage;