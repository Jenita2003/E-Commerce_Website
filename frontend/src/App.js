import React, { useState, useContext } from 'react'; 
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import Welcome from './pages/Welcome';
import Login from './components/Login';
import Register from './components/Register';
import { GeneralContext } from './context/GeneralContext'; // Import context

import Cart from './pages/customer/Cart';
import Profile from './pages/customer/Profile';
import CategoryProducts from './pages/customer/CategoryProducts';
import IndividualProduct from './pages/customer/IndividualProduct';

import Admin from './pages/admin/Admin';
import AllProducts from './pages/admin/AllProducts';
import AllUsers from './pages/admin/AllUsers';
import AllOrders from './pages/admin/AllOrders';
import NewProduct from './pages/admin/NewProduct';
import UpdateProduct from './pages/admin/UpdateProduct';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useContext(GeneralContext); // Access isAuthenticated
  
  return (
    <div className="App">
      <Routes>
        {/* Conditionally render Welcome or Home based on authentication status */}
        <Route path="/" element={isAuthenticated ? <Home /> : <Welcome />} />

        {/* Login and Register Routes */}
        <Route 
          path="/auth" 
          element={
            isLogin ? 
              <Login setIsLogin={setIsLogin} /> : 
              <Register setIsLogin={setIsLogin} />
          } 
        />

        {/* Routes with Navbar */}
        <Route path="/home" element={<><Navbar /><Home /></>} />
        <Route path="/auth" element={<><Navbar /><Authentication /></>} />
        <Route path="/cart" element={<><Navbar /><Cart /></>} />
        <Route path="/product/:id" element={<><Navbar /><IndividualProduct /></>} />
        <Route path="/category/:category" element={<><Navbar /><CategoryProducts /></>} />
        <Route path="/profile" element={<><Navbar /><Profile /></>} />
        
        {/* Admin Routes with Navbar */}
        <Route path="/admin" element={<><Navbar /><Admin /></>} />
        <Route path="/all-products" element={<><Navbar /><AllProducts /></>} />
        <Route path="/all-users" element={<><Navbar /><AllUsers /></>} />
        <Route path="/all-orders" element={<><Navbar /><AllOrders /></>} />
        <Route path="/new-product" element={<><Navbar /><NewProduct /></>} />
        <Route path="/update-product/:id" element={<><Navbar /><UpdateProduct /></>} />
      </Routes>
    </div>
  );
}

export default App;
