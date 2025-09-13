import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddAboutPage.css';

function AddAboutPage() {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        const response = await axios.get('');
        if (response.data) {
          setDescription(response.data.description || '');
        }
      } catch (error) {
        console.error("Error fetching about info:", error);
      }
    };
    fetchAboutInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', description);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      await axios.post('', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('వివరాలు విజయవంతంగా అప్‌డేట్ చేయబడ్డాయి!');
      setPhoto(null);
      document.getElementById('photo-input').value = '';
    } catch (error) {
      setMessage('వివరాలను అప్‌డేట్ చేయడంలో లోపం సంభవించింది.');
      console.error('Error updating about info:', error);
    }
  };

  return (
    <div className="add-about-container">
      <h2>నా గురించి అప్‌డేట్ చేయండి</h2>
      <p className="add-about-description">
        హోమ్ పేజీలో మీ ఫోటో మరియు వివరణను మార్చండి.
      </p>

      <form className="add-about-form" onSubmit={handleSubmit}>
        <label htmlFor="description">వివరణ</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="10"
          required
        />
        
        <label htmlFor="photo-input">ఫోటోను అప్‌లోడ్ చేయండి</label>
        <input
          type="file"
          id="photo-input"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        
        <button type="submit">అప్‌డేట్ చేయండి</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default AddAboutPage;