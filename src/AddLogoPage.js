import React, { useState } from 'react';
import axios from 'axios';
import './AddLogoPage.css';

function AddLogoPage() {
  const [logoImage, setLogoImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('logo_image', logoImage);

    try {
      await axios.post('https://bible-mining-backend.onrender.com', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('లోగో విజయవంతంగా అప్‌డేట్ చేయబడింది!');
      setLogoImage(null);
      document.getElementById('logo-input').value = '';
    } catch (error) {
      setMessage('లోగోను అప్‌డేట్ చేయడంలో లోపం సంభవించింది.');
      console.error('Error updating logo:', error);
    }
  };

  return (
    <div className="add-logo-container">
      <h2>లోగోను అప్‌డేట్ చేయండి</h2>
      <p className="add-logo-description">
        మీ కంప్యూటర్ నుండి ఒక లోగో ఫైల్‌ను ఎంచుకొని, అప్‌లోడ్ చేయండి.
      </p>

      <form className="add-logo-form" onSubmit={handleSubmit}>
        <label htmlFor="logo-input">లోగో ఫైల్‌ను ఎంచుకోండి</label>
        <input
          type="file"
          id="logo-input"
          accept="image/*"
          onChange={(e) => setLogoImage(e.target.files[0])}
          required
        />
        <button type="submit">లోగోను అప్‌డేట్ చేయండి</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default AddLogoPage;