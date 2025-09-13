import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPhotoPage.css';

function AddPhotoPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('');
        setCategories(['All', ...new Set(response.data.categories)]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryToUse = category === 'new' ? newCategory : category;

    if (!categoryToUse) {
      setMessage('దయచేసి వర్గాన్ని ఎంచుకోండి లేదా జోడించండి.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', categoryToUse);
    formData.append('photo', photoFile);

    try {
      await axios.post('', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('ఫోటో విజయవంతంగా జోడించబడింది!');
      setTitle('');
      setDescription('');
      setPhotoFile(null);
      setCategory('');
      setNewCategory('');
      document.getElementById('photo-input').value = '';
      const response = await axios.get('');
      setCategories(['All', ...new Set(response.data.categories)]);
    } catch (error) {
      setMessage('ఫోటోను జోడించడంలో లోపం సంభవించింది.');
      console.error('Error adding photo:', error);
    }
  };

  return (
    <div className="add-photo-container">
      <h2>కొత్త ఫోటోను జోడించండి</h2>
      <p className="add-photo-description">
        మీ కంప్యూటర్ నుండి ఒక ఫోటోను అప్‌లోడ్ చేయండి.
      </p>

      <form className="add-photo-form" onSubmit={handleSubmit}>
        <label htmlFor="title">టైటిల్</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
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
        
        <label htmlFor="description">వివరణ</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
          required
        />

        <label htmlFor="photo-input">ఫోటో ఫైల్‌ను ఎంచుకోండి</label>
        <input
          type="file"
          id="photo-input"
          accept="image/*"
          onChange={(e) => setPhotoFile(e.target.files[0])}
          required
        />
        
        <button type="submit">ఫోటోను జోడించండి</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default AddPhotoPage;