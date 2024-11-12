import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { f_userName: username, f_Pwd: password });
      localStorage.setItem('username', username);
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      window.location.href = '/dashboard';
    } catch (error) {
      alert('Invalid login details');
    }
  };

  return (
    <div>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
