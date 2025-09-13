import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { songsCategories } from './SongsData';
import Sidebar from './Sidebar'; // Sidebar ను ఇక్కడ ఇంపోర్ట్ చేస్తున్నాం
import './SongsPage.css';

function CategorySongsPage() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName);
  const [selectedAlphabet, setSelectedAlphabet] = useState(''); // అక్షరాల ఫిల్టర్ కోసం
  const [searchTerm, setSearchTerm] = useState(''); // సెర్చ్ బార్ కోసం
  const [expandedSongId, setExpandedSongId] = useState(null);

  const category = songsCategories.find(cat => cat.name === decodedCategory);

  if (!category) {
    return <p className="no-songs-found">ఈ వర్గం దొరకలేదు.</p>;
  }

  // ఫిల్టర్ చేసిన పాటలను పొందడం
  const filteredSongs = category.items.filter(song => {
    const isAlphabetMatch = selectedAlphabet === '' || song.title.toLowerCase().startsWith(selectedAlphabet.toLowerCase());
    const isSearchMatch = song.title.toLowerCase().includes(searchTerm.toLowerCase());
    return isAlphabetMatch && isSearchMatch;
  });

  const handleLyricsToggle = (id) => {
    setExpandedSongId(expandedSongId === id ? null : id);
  };

  const handleResetFilters = () => {
    setSelectedAlphabet('');
    setSearchTerm('');
  };

  return (
    <div className="main-layout">
      {/* సైడ్‌బార్ ను ఇక్కడ పెడుతున్నాం */}
      <Sidebar 
        onSelectAlphabet={setSelectedAlphabet}
        onSelectCategory={() => {}} // కేటగిరీని మార్చాల్సిన అవసరం లేదు
        selectedAlphabet={selectedAlphabet}
        categories={[]} // సైడ్‌బార్ లో కేటగిరీలు చూపించాల్సిన అవసరం లేదు
      />
      
      <div className="songs-content">
        <h2>{category.name}</h2>
        <Link to="/songs" className="back-btn">
          &lt; పాటల వర్గాలకు తిరిగి వెళ్ళు
        </Link>
        
        <div className="controls-container">
          <input
            type="text"
            placeholder="పాట కోసం వెతకండి..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="reset-btn" onClick={handleResetFilters}>
            ఫిల్టర్‌లను రీసెట్ చేయండి
          </button>
        </div>
        
        <div className="song-grid">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song) => (
              <div key={song.id} className="song-card">
                <h3>{song.title}</h3>
                <p className="singer">సింగర్: {song.singer}</p>
                
                <button 
                  className="lyrics-toggle-btn" 
                  onClick={() => handleLyricsToggle(song.id)}>
                  {expandedSongId === song.id ? 'లిరిక్స్ మూసివేయి' : 'లిరిక్స్ చూడండి'}
                </button>
                
                {expandedSongId === song.id && (
                  <div className="song-lyrics">
                    <p>{song.lyrics}</p>
                  </div>
                )}
                
                {song.audio_url && (
                  <audio controls className="audio-player">
                    <source src={song.audio_url} type="audio/mpeg" />
                    మీ బ్రౌజర్ ఆడియోను సపోర్ట్ చేయడం లేదు.
                  </audio>
                )}
              </div>
            ))
          ) : (
            <p className="no-songs-found">ఎటువంటి పాటలు దొరకలేదు.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategorySongsPage;