import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setIsLogin }) => {
  const { setEmail, setPassword, login, isAuthenticated, setIsAuthenticated } = useContext(GeneralContext);
  const navigate = useNavigate();

  // Add a specific class to the body when the Login component mounts
  useEffect(() => {
    document.body.classList.add('login-background');

    return () => {
      // Remove the class when the component unmounts to avoid it affecting other pages
      document.body.classList.remove('login-background');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login();
    if (success) {
      setIsAuthenticated(true);
      navigate('/home');
    }
  };

  return (
    <div className="Main">
      <form className="authForm" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-floating mb-3 authFormInputs">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3 authFormInputs">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
        <p>
          Not registered? <span onClick={() => setIsLogin(false)}>Register</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
