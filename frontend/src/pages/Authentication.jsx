import React, { useState, useEffect, useContext } from 'react';
import '../styles/Authentication.css';
import Login from '../components/Login';
import Register from '../components/Register';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { GeneralContext } from '../context/GeneralContext'; // Import GeneralContext to get user information

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Use the context to get the user's authentication status
  const { username, email } = useContext(GeneralContext); 

  useEffect(() => {
    // Check if the user is already logged in by checking localStorage
    const isAuthenticated = localStorage.getItem('userId');
    
    if (isAuthenticated) {
      // Redirect user to Home page or Admin page based on user type
      const userType = localStorage.getItem('userType');
      if (userType === 'customer') {
        navigate('/home');
      } else if (userType === 'admin') {
        navigate('/admin');
      }
    }
  }, [navigate]); // The effect runs when the component mounts or the navigate changes

  return (
    <div className="AuthenticatePage">
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Register setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Authentication;
