import React, { useContext, useEffect, useState } from 'react'
import {BsCart3, BsPersonCircle} from 'react-icons/bs'
import {FcSearch} from 'react-icons/fc'
import '../styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { GeneralContext } from '../context/GeneralContext'
import {ImCancelCircle} from 'react-icons/im'
import axios from 'axios'

const Navbar = () => {
  const { searchProducts } = useContext(GeneralContext);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const usertype = localStorage.getItem('userType');
  const username = localStorage.getItem('username');

  const {cartCount, logout} = useContext(GeneralContext);

  const [productSearch, setProductSearch] = useState('');

  const [noResult, setNoResult] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    fetchData();
  }, [])

  const fetchData = async() =>{

    await axios.get('http://localhost:6001/fetch-categories').then(
      (response)=>{
        setCategories(response.data);
      }
    )
  }
// Navbar.jsx
const handleSearch = async () => {
  if (query.trim() === '') return; // Skip if query is empty

  try {
    const response = await axios.get(`http://localhost:6001/api/products/search?query=${query}`);
    setProducts(response.data); // Set the products to display in the search results
    
    // Redirect to a search results page with the query as a parameter
    navigate(`/search?query=${query}`, { state: { products: response.data } });
  } catch (error) {
    console.error('Error fetching search results:', error);
    setNoResult(true); // Show "no items found" message if there's an error or no results
  }
};

  return (

    <>
      {/* user navbar */}

      {!usertype ?

          <div className="navbar">
          <h3 onClick={()=> navigate('')}>ShopEZ</h3>
          <div className="nav-content">
            <div className="nav-search">
              <input type="text" name="nav-search" id="nav-search" placeholder='Search Electronics, Fashion, mobiles, etc.,' onChange={(e)=>setProductSearch(e.target.value)} />
              <FcSearch className="nav-search-icon" onClick={handleSearch} />
              {
                noResult === true ?
                  <div className='search-result-data'>no items found.... try searching for Electronics, mobiles, Groceries, etc., <ImCancelCircle className='search-result-data-close-btn' onClick={()=> setNoResult(false)}  /></div>
                :
                ""
              }
            </div>


            <button className='btn' onClick={()=> navigate('/auth')}>Login</button>

          </div>
          </div>

        : <>

            {usertype === 'customer' ?
            
                <div className="navbar">
                  <h3 onClick={()=> navigate('/home')}>ShopEZ</h3>
                  <div className="nav-content">
                    <div className="nav-search">
                      <input type="text" name="nav-search" id="nav-search" placeholder='Search Electronics, Fashion, mobiles, etc.,' onChange={(e)=>setProductSearch(e.target.value)} />
                      <FcSearch className="nav-search-icon" onClick={handleSearch} />
                      {
                        noResult === true ?
                          <div className='search-result-data'>no items found.... try searching for Electronics, mobiles, Groceries, etc., <ImCancelCircle className='search-result-data-close-btn' onClick={()=> setNoResult(false)}  /></div>
                        :
                        ""
                      }
                    </div>

                    <div className='nav-content-icons' >
                      <div className="nav-profile" onClick={()=> navigate('/profile')}>
                        <BsPersonCircle className='navbar-icons' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Profile" />
                        <p>{username}</p>
                      </div>
                      <div className="nav-cart" onClick={()=> navigate('/cart')}>
                        <BsCart3 className='navbar-icons' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cart" />
                        <div className="cart-count">{cartCount}</div>
                      </div>
                    </div>
                  </div>
                </div>

              :

              <div className="navbar-admin">
                <h3 onClick={()=> navigate('/admin')}>ShopEZ (admin)</h3>
                
                <ul>
                  <li onClick={()=> navigate('/admin')}>Home</li>
                  <li onClick={()=> navigate('/all-users')}>Users</li>
                  <li onClick={()=> navigate('/all-orders')}>Orders</li>
                  <li onClick={()=> navigate('/all-products')}>Products</li>
                  <li onClick={()=> navigate('/new-product')}>New Product</li>
                  <li onClick={logout}>Logout</li>
                </ul>
              </div>

            }
        
          </>

          
      }
        
    </>
  )
}

export default Navbar