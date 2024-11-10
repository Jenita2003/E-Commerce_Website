import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-4 mb-3">Welcome to ShopEZ</h1>
        <p className="lead mb-4">Your one-stop shop for Fashion, Electronics, Groceries, and more!</p>
        <button className="btn btn-primary btn-lg" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
