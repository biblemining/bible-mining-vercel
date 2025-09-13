import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './VideosPage.css';

function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [selectedAlphabet, setSelectedAlphabet] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  // YouTube URL నుండి వీడియో ID ను సంగ్రహించే ఫంక్షన్
  const extractVideoId = (url) => {
    let videoId = '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^&\n?#]+)/);
    if (match && match[1]) {
      videoId = match[1];
    }
    return videoId;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('https://bible-mining-backend.onrender.com');
        setVideos(response.data.videos);
        setAuthors(['All', ...new Set(response.data.authors)]);
        setCategories(['All', ...new Set(response.data.categories)]);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("వీడియోలను లోడ్ చేయడంలో లోపం సంభవించింది.");
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const filteredVideos = videos.filter(video =>
    (selectedCategory === 'All' || video.category === selectedCategory) &&
    (selectedAuthor === 'All' || video.author === selectedAuthor) &&
    (selectedAlphabet === '' || video.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase())) &&
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedAuthor('All');
    setSelectedAlphabet('');
    setSearchTerm('');
  };

  if (loading) {
    return <div className="videos-container">లోడ్ అవుతోంది...</div>;
  }

  if (error) {
    return <div className="videos-container error-message">{error}</div>;
  }

  return (
    <div className="main-layout">
      <Sidebar 
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        onSelectAuthor={setSelectedAuthor}
        selectedAuthor={selectedAuthor}
        onSelectAlphabet={setSelectedAlphabet}
        selectedAlphabet={selectedAlphabet}
        categories={categories}
        authors={authors}
      />
      
      <div className="songs-content">
        <h2>నా YouTube వీడియోలు</h2>
        <p className="page-description">
          ఇక్కడ మీరు మా YouTube వీడియోలను చూడవచ్చు.
        </p>
        
        <div className="controls-container">
          <input
            type="text"
            placeholder="వీడియో కోసం వెతకండి..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="reset-btn" onClick={handleResetFilters}>
            ఫిల్టర్‌లను రీసెట్ చేయండి
          </button>
        </div>
        
        <div className="video-grid">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <div key={video._id} className="video-card">
                <a href={video.youtube_url} target="_blank" rel="noopener noreferrer">
                  <img src={`https://img.youtube.com/vi/${extractVideoId(video.youtube_url)}/hqdefault.jpg`} alt={video.title} className="video-thumbnail" />
                </a>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p className="video-author">బోధకుడు: {video.author}</p>
                  <p>{video.description}</p>
                  <a href={video.youtube_url} target="_blank" rel="noopener noreferrer" className="watch-btn">
                    వీడియో చూడండి
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="no-videos-found">ఎటువంటి వీడియోలు దొరకలేదు.</p>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default VideosPage;