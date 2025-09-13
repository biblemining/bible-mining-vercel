import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddContactPage.css';

function AddContactPage() {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact');
        const info = response.data;
        if (info) {
          setAddress(info.address || '');
          setPhoneNumber(info.phone_number || '');
          setEmail(info.email || '');
          setYoutubeLink(info.youtube_link || '');
          setFacebookLink(info.facebook_link || '');
          setInstagramLink(info.instagram_link || '');
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };
    fetchContactInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactInfo = {
      address,
      phone_number: phoneNumber,
      email,
      youtube_link: youtubeLink,
      facebook_link: facebookLink,
      instagram_link: instagramLink,
    };
    try {
      await axios.post('http://localhost:5000/api/contact', contactInfo);
      setMessage('సంప్రదింపు వివరాలు విజయవంతంగా అప్‌డేట్ చేయబడ్డాయి!');
    } catch (error) {
      setMessage('సంప్రదింపు వివరాలను అప్‌డేట్ చేయడంలో లోపం సంభవించింది.');
      console.error('Error updating contact info:', error);
    }
  };

  return (
    <div className="add-contact-container">
      <h2>సంప్రదింపు వివరాలను అప్‌డేట్ చేయండి</h2>
      <p className="add-contact-description">
        మీ వెబ్‌సైట్‌లో కనిపించే సంప్రదింపు వివరాలను ఇక్కడ మార్చండి.
      </p>

      <form className="add-contact-form" onSubmit={handleSubmit}>
        <label htmlFor="address">చిరునామా</label>
        <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows="3" required />

        <label htmlFor="phone">ఫోన్ నంబర్</label>
        <input type="tel" id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

        <label htmlFor="email">ఈమెయిల్</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="youtube">YouTube Link</label>
        <input type="url" id="youtube" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />

        <label htmlFor="facebook">Facebook Link</label>
        <input type="url" id="facebook" value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} />

        <label htmlFor="instagram">Instagram Link</label>
        <input type="url" id="instagram" value={instagramLink} onChange={(e) => setInstagramLink(e.target.value)} />

        <button type="submit">అప్‌డేట్ చేయండి</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

export default AddContactPage;