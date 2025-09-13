import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      if (response.data.success) {
        localStorage.setItem('isAuthenticated', 'true'); // లాగిన్ అయినట్లు గుర్తుంచుకోవడానికి
        onLogin(true);
        navigate('/'); // హోమ్ పేజీకి పంపడం
      } else {
        setError('తప్పు యూజర్‌నేమ్ లేదా పాస్‌వర్డ్.');
      }
    } catch (err) {
      setError('తప్పు యూజర్‌నేమ్ లేదా పాస్‌వర్డ్.');
    }
  };

  return (
    <div className="login-container">
      <h2>అడ్మిన్ లాగిన్</h2>
      <p>కంటెంట్‌ను మార్చడానికి, దయచేసి లాగిన్ అవ్వండి.</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">యూజర్‌నేమ్</label>
        <input 
          type="text" 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <label htmlFor="password">పాస్‌వర్డ్</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">లాగిన్</button>
      </form>
    </div>
  );
}

export default LoginPage;