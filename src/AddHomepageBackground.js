import React, { useState } from 'react';
import axios from 'axios';
import './AddHomepageBackground.css';

function AddHomepageBackground() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('background_image', backgroundImage);

    try {
      await axios.post('', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('హోమ్ పేజీ బ్యాక్‌గ్రౌండ్ విజయవంతంగా అప్‌డేట్ చేయబడింది!');
      setBackgroundImage(null);
      document.getElementById('background-input').value = '';
    } catch (error) {
      setMessage('బ్యాక్‌గ్రౌండ్‌ను అప్‌డేట్ చేయడంలో లోపం సంభవించింది.');
      console.error('Error updating background image:', error);
    }
  };

  return (
    <div className="add-background-container">
      <h2>హోమ్ పేజీ బ్యాక్‌గ్రౌండ్‌ను అప్‌డేట్ చేయండి</h2>
      <p className="add-background-description">
        మీ కంప్యూటర్ నుండి ఒక ఫోటోను ఎంచుకొని, హోమ్ పేజీ బ్యాక్‌గ్రౌండ్‌గా సెట్ చేయండి.
      </p>

      <form className="add-background-form" onSubmit={handleSubmit}>
        <label htmlFor="background-input">ఫోటో ఫైల్‌ను ఎంచుకోండి</label>
        <input
          type="file"
          id="background-input"
          accept="image/*"
          onChange={(e) => setBackgroundImage(e.target.files[0])}
          required
        />
        <button type="submit">బ్యాక్‌గ్రౌండ్‌ను అప్‌డేట్ చేయండి</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default AddHomepageBackground;