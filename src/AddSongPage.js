import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddSongPage.css';

function AddSongPage() {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [singer, setSinger] = useState('');
  const [newSinger, setNewSinger] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [order, setOrder] = useState('');
  const [singers, setSingers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://bible-mining-backend.onrender.com');
        const uniqueSingers = ['All', ...new Set(response.data.songs.map(song => song.singer))];
        const uniqueCategories = ['All', ...new Set(response.data.songs.map(song => song.category))];
        setSingers(uniqueSingers);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const singerToUse = singer === 'new' ? newSinger : singer;
    const categoryToUse = category === 'new' ? newCategory : category;

    if (!singerToUse || !categoryToUse) {
      setMessage('దయచేసి రచయిత పేరు మరియు వర్గాన్ని ఎంచుకోండి లేదా జోడించండి.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('lyrics', lyrics);
    formData.append('singer', singerToUse);
    formData.append('category', categoryToUse);
    formData.append('order', order);
    formData.append('audio', audioFile);

    try {
      await axios.post('https://bible-mining-backend.onrender.com', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('పాట విజయవంతంగా జోడించబడింది!');
      setTitle('');
      setLyrics('');
      setAudioFile(null);
      setSinger('');
      setNewSinger('');
      setCategory('');
      setNewCategory('');
      setOrder('');
      document.getElementById('audio-input').value = '';
      const response = await axios.get('https://bible-mining-backend.onrender.com');
      const uniqueSingers = ['All', ...new Set(response.data.songs.map(song => song.singer))];
      const uniqueCategories = ['All', ...new Set(response.data.songs.map(song => song.category))];
      setSingers(uniqueSingers);
      setCategories(uniqueCategories);
    } catch (error) {
      setMessage('పాటను జోడించడంలో లోపం సంభవించింది.');
      console.error('Error adding song:', error);
    }
  };

  return (
    <div className="add-song-container">
      <h2>కొత్త పాటను జోడించండి</h2>
      <p className="add-song-description">
        మీ కంప్యూటర్ నుండి పాటను అప్‌లోడ్ చేయండి.
      </p>

      <form className="add-song-form" onSubmit={handleSubmit}>
        <label htmlFor="title">పాట పేరు</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <label htmlFor="order">క్రమ సంఖ్య (Order Number)</label>
        <input
          type="number"
          id="order"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          required
        />

        <label htmlFor="singer-select">రచయిత పేరు</label>
        <select 
          id="singer-select" 
          value={singer} 
          onChange={(e) => setSinger(e.target.value)} 
          required
        >
          <option value="">రచయితను ఎంచుకోండి</option>
          {singers.map((s, index) => (
            <option key={index} value={s}>{s}</option>
          ))}
          <option value="new">కొత్త రచయితను జోడించండి</option>
        </select>
        
        {singer === 'new' && (
          <input
            type="text"
            placeholder="కొత్త రచయిత పేరును టైప్ చేయండి"
            value={newSinger}
            onChange={(e) => setNewSinger(e.target.value)}
            required
          />
        )}

        <label htmlFor="category-select">వర్గం</label>
        <select 
          id="category-select" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required
        >
          <option value="">వర్గాన్ని ఎంచుకోండి</option>
          {categories.map((c, index) => (
            <option key={index} value={c}>{c}</option>
          ))}
          <option value="new">కొత్త వర్గాన్ని జోడించండి</option>
        </select>

        {category === 'new' && (
          <input
            type="text"
            placeholder="కొత్త వర్గం పేరును టైప్ చేయండి"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            required
          />
        )}

        <label htmlFor="audio-input">ఆడియో ఫైల్‌ను ఎంచుకోండి</label>
        <input
          type="file"
          id="audio-input"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
          required
        />

        <label htmlFor="lyrics">పాట లిరిక్స్</label>
        <textarea
          id="lyrics"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          rows="10"
          required
        />
        
        <button type="submit">పాటను జోడించండి</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default AddSongPage;