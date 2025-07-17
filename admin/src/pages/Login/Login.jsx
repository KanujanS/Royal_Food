import React, { useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';

const predefinedAdmins = [
  { email: 'admin1@royal.com', password: 'Admin123' },
  { email: 'admin2@royal.com', password: 'Admin456' },
  { email: 'admin3@royal.com', password: 'Admin789' }
];

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const admin = predefinedAdmins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (admin) {
      onLogin(admin.email);
      toast.success('Successfully Login');
    } else {
      toast.error('Invalid admin credentials');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;