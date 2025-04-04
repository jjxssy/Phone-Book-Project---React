import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './home.module.css';
import pageClasses from '../../app/page.module.css';

/**
 * Home component with login functionality
 * @param {Object} props - Component props
 * @param {Function} props.onLogin - Function to handle login
 * @returns {JSX.Element} - Rendered component
 */
function Home({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Demo accounts
  const demoAccounts = {
    admin: { username: 'admin', password: 'admin123', role: 'admin' },
    user: { username: 'user', password: 'user123', role: 'user' },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { username, password } = formData;
    
    // Simple validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Check if admin credentials
    if (username === demoAccounts.admin.username && password === demoAccounts.admin.password) {
      if (onLogin) {
        onLogin({
          username,
          role: 'admin',
          id: Date.now(),
        });
      }
      navigate('/contacts');
      return;
    }
    
    // Check if user credentials
    if (username === demoAccounts.user.username && password === demoAccounts.user.password) {
      if (onLogin) {
        onLogin({
          username,
          role: 'user',
          id: Date.now(),
        });
      }
      navigate('/contacts');
      return;
    }
    
    // If we get here, credentials are invalid
    setError('Invalid username or password');
  };

  return (
    <div className={classes.homeContainer}>
      <div className={classes.contentWrapper}>
        <div className={classes.leftPanel}>
          <h1>Phone Book App</h1>
          <p className={classes.tagline}>
            Manage your contacts with ease
          </p>
          <div className={classes.features}>
            <div className={classes.feature}>
              <span className={classes.featureIcon}>📱</span>
              <div>
                <h3>Store Contacts</h3>
                <p>Keep all your important contacts in one place</p>
              </div>
            </div>
            <div className={classes.feature}>
              <span className={classes.featureIcon}>🔍</span>
              <div>
                <h3>Easy Search</h3>
                <p>Find contacts quickly with powerful search</p>
              </div>
            </div>
            <div className={classes.feature}>
              <span className={classes.featureIcon}>🏷️</span>
              <div>
                <h3>Tag & Categorize</h3>
                <p>Organize contacts with custom tags</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className={classes.rightPanel}>
          <div className={classes.loginCard}>
            <form onSubmit={handleSubmit} className={classes.loginForm}>
              <h2>Login</h2>
              
              {error && <div className={classes.errorMessage}>{error}</div>}
              
              <div className={classes.formGroup}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                />
              </div>
              
              <div className={classes.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
              
              <button type="submit" className={classes.loginButton}>
                Login
              </button>
              
              <div className={classes.demoCredentials}>
                <p>Demo Credentials:</p>
                <p><strong>Admin:</strong> admin / admin123</p>
                <p><strong>User:</strong> user / user123</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
