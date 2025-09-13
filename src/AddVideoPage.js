import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddVideoPage.css';

function AddVideoPage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('');
        const uniqueAuthors = ['All', ...new Set(response.data.videos.map(video => video.author))];
        const uniqueCategories = ['All', ...new Set(response.data.videos.map(video => video.category))];
        setAuthors(uniqueAuthors);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorToUse = author === 'new' ? newAuthor : author;
    const categoryToUse = category === 'new' ? newCategory : category;

    if (!authorToUse || !categoryToUse) {
      setMessage('దయచేసి బోధకుని పేరు మరియు వర్గాన్ని ఎంచుకోండి లేదా జోడించండి.');
      return;
    }

    const newVideo = {
      title,
      author: authorToUse,
      category: categoryToUse,
      youtube_url: youtubeUrl,
      description,
    };

    try {
      await axios.post('', newVideo);
      setMessage('వీడియో విజయవంతంగా జోడించబడింది!');
      setTitle('');
      setAuthor('');
      setNewAuthor('');
      setCategory('');
      setNewCategory('');
      setYoutubeUrl('');
      setDescription('');
      const response = await axios.get('');
      const uniqueAuthors = ['All', ...new Set(response.data.videos.map(video => video.author))];
      const uniqueCategories = ['All', ...new Set(response.data.videos.map(video => video.category))];
      setAuthors(uniqueAuthors);
      setCategories(uniqueCategories);
    } catch (error) {
      setMessage('వీడియోను జోడించడంలో లోపం సంభవించింది.');
      console.error('Error adding video:', error);
    }
  };

  return (
    <div className="add-video-container">
      <h2>కొత్త వీడియోను జోడించండి</h2>
      <p className="add-video-description">
        మీ YouTube వీడియో వివరాలను ఇక్కడ జోడించండి.
      </p>

      <form className="add-video-form" onSubmit={handleSubmit}>
        <label htmlFor="title">వీడియో టైటిల్</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <label htmlFor="author-select">బోధకుని పేరు</label>
        <select 
          id="author-select" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          required
        >
          <option value="">బోధకుని పేరును ఎంచుకోండి</option>
          {authors.map((a, index) => (
            <option key={index} value={a}>{a}</option>
          ))}
          <option value="new">కొత్త బోధకుని పేరును జోడించండి</option>
        </select>
        
        {author === 'new' && (
          <input
            type="text"
            placeholder="కొత్త బోధకుని పేరును టైప్ చేయండి"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
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
        
        <label htmlFor="youtube-url">YouTube Embed URL</label>
        <input
          type="text"
          id="youtube-url"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          required
        />

        <label htmlFor="description">వివరణ</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
          required
        />
        
        <button type="submit">వీడియోను జోడించండి</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default AddVideoPage;