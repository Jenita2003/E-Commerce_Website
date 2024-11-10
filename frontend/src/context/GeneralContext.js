import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
    const navigate = useNavigate();

    // User state
 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usertype, setUsertype] = useState('');

    // Product and search state
    const [products, setProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [productSearch, setProductSearch] = useState('');
    const [categories, setCategories] = useState([]);

    // Cart state
    const [cartCount, setCartCount] = useState(0);

    // Fetch cart count on component mount
    useEffect(() => {
        fetchCartCount();
        fetchCategories(); // Fetch categories when the app loads
    }, []);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:6001/fetch-categories');
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Fetch all products (including newly added ones)
    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:6001/fetch-products');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching all products:", error);
        }
    };

    // Fetch products based on category (including newly added ones)
    const fetchCategoryProducts = async (category) => {
        try {
            const response = await axios.get(`http://localhost:6001/fetch-products?category=${category}`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching category products:", error);
        }
    };

    // Handle product search
    const handleSearch = () => {
        navigate('#products-body');
    };

    // Search products by name (to include newly added products)
    const searchProducts = async (query) => {
      try {
        const response = await axios.get(`http://localhost:6001/api/products/search?query=${query}`);
        setSearchResults(response.data);  // Update the searchResults state
      } catch (error) {
        console.error("Error searching products:", error);
      }
    };

    // Fetch cart count
    const fetchCartCount = async () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            await axios.get('http://localhost:6001/fetch-cart').then(
                (response) => {
                    setCartCount(response.data.filter(item => item.userId === userId).length);
                }
            );
        }
    };

    // User login
    const login = async () => {
        try {
            const loginInputs = { email, password };
            await axios.post('http://localhost:6001/login', loginInputs)
                .then((res) => {
                    // Store user data in localStorage
                    localStorage.setItem('userId', res.data._id);
                    localStorage.setItem('userType', res.data.usertype);
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('email', res.data.email);
                    
                    // Redirect based on user type
                    if (res.data.usertype === 'customer') {
                        navigate('/home');
                    } else if (res.data.usertype === 'admin') {
                        navigate('/admin');
                    }
                }).catch((err) => {
                    alert("Login failed!");
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    // User registration
    const inputs = { username, email, usertype, password };
    const register = async () => {
        try {
            await axios.post('http://localhost:6001/register', inputs)
                .then(async (res) => {
                    localStorage.setItem('userId', res.data._id);
                    localStorage.setItem('userType', res.data.usertype);
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('email', res.data.email);

                    if (res.data.usertype === 'customer') {
                        navigate('/');
                    } else if (res.data.usertype === 'admin') {
                        navigate('/admin');
                    }
                }).catch((err) => {
                    alert("Registration failed!");
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    // User logout
    const logout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <GeneralContext.Provider value={{
            login,
            register,
            logout,
            username,
            setUsername,
            email,
            setEmail,
            password,
            setPassword,
            usertype,
            setUsertype,
            productSearch,
            setProductSearch,
            handleSearch,
            cartCount,
            products,
            searchResults,
            categories,
            searchProducts,
            fetchCategoryProducts,
            fetchAllProducts,
        }}>
            {children}
        </GeneralContext.Provider>
    );
};

export default GeneralContextProvider;
