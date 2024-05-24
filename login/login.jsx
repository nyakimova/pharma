import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:8000/csrf/', { withCredentials: true });
        axios.defaults.headers.post['X-CSRFToken'] = response.data.csrfToken;
        console.log('CSRF token fetched:', response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/user-auth/login/', {
        username,
        password,
      });
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        localStorage.setItem('authToken', response.data.token); // Save the token to localStorage
        navigate('/box'); // Redirect to the booking page on successful login
      } else {
        console.log('Login failed with status:', response.status);
        setError(response.data.message || 'Unknown Error');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Network Error');
    }
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <div style={{ backgroundColor: '#f0f4f7', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
        <h3 style={{ color: '#007bff' }}>ВХІД</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label htmlFor="username" style={{ color: '#007bff', marginBottom: '6px' }}>Логін</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', padding: '5px', marginBottom: '20px', border: '1px solid #007bff', borderRadius: '4px' }}
        />
        <label htmlFor="password" style={{ color: '#007bff', marginBottom: '6px' }}>Пароль</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: '5px', marginBottom: '20px', border: '1px solid #007bff', borderRadius: '4px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>ВХІД</button>
      </form>
    </div>
  );
};

export default Login;
