import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './SermonsPage.css';

function SermonsPage() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All'); // కొత్త స్టేట్
  const [selectedAlphabet, setSelectedAlphabet] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sermons');
        setSermons(response.data.sermons);
        setAuthors(['All', ...new Set(response.data.authors)]);
        setCategories(['All', ...new Set(response.data.categories)]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sermons:", err);
        setError("ప్రసంగాలను లోడ్ చేయడంలో లోపం సంభవించింది.");
        setLoading(false);
      }
    };
    fetchSermons();
  }, []);
  
  const filteredSermons = sermons.filter(sermon =>
    (selectedCategory === 'All' || sermon.category === selectedCategory) &&
    (selectedAuthor === 'All' || sermon.author === selectedAuthor) &&
    (selectedAlphabet === '' || sermon.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase())) &&
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedAuthor('All');
    setSelectedAlphabet('');
    setSearchTerm('');
  };

  if (loading) {
    return <div className="sermons-container">లోడ్ అవుతోంది...</div>;
  }

  if (error) {
    return <div className="sermons-container error-message">{error}</div>;
  }

  return (
    <div className="main-layout">
      <Sidebar 
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        onSelectAuthor={setSelectedAuthor} // ఇక్కడ onSelectAuthor ను Sidebar కు పంపుతున్నాం
        selectedAuthor={selectedAuthor} // ఎంచుకున్న రచయితను పంపుతున్నాం
        onSelectAlphabet={setSelectedAlphabet}
        selectedAlphabet={selectedAlphabet}
        categories={categories}
        authors={authors} // రచయితల జాబితాను పంపుతున్నాం
      />
      
      <div className="sermons-content">
        <h2>ప్రసంగాలు</h2>
        <p className="page-description">
          ఇక్కడ మీరు పాస్టర్ల ప్రసంగాలను పీడీఎఫ్ ఫైల్స్‌లో చదవవచ్చు.
        </p>

        <div className="controls-container">
          <input
            type="text"
            placeholder="ప్రసంగం కోసం వెతకండి..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="reset-btn" onClick={handleResetFilters}>
            ఫిల్టర్‌లను రీసెట్ చేయండి
          </button>
        </div>

        <div className="sermon-grid">
          {filteredSermons.length > 0 ? (
            filteredSermons.map((sermon) => (
              <div key={sermon._id} className="sermon-card">
                <h3>{sermon.title}</h3>
                <p className="sermon-category">వర్గం: {sermon.category}</p>
                <p className="sermon-author">రచయిత: {sermon.author}</p>
                <p className="sermon-description">{sermon.description}</p>
                <a 
                  href={sermon.pdf_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="pdf-link-btn"
                >
                  పీడీఎఫ్ చూడండి
                </a>
              </div>
            ))
          ) : (
            <p className="no-sermons-found">ఎటువంటి ప్రసంగాలు దొరకలేదు.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SermonsPage;