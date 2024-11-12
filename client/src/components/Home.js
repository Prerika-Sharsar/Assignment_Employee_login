// src/components/Home.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    // Clear user data from local storage and redirect to login
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome, {userName}!</h1>
      <p>This is your dashboard home page.</p>
      
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'blue' }}>Home</Link>
        <Link to="/employee-list" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'blue' }}>Employee List</Link>
        <button onClick={handleLogout} style={{ fontWeight: 'bold', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Logout</button>
      </nav>
    </div>
  );
};

export default Home;
