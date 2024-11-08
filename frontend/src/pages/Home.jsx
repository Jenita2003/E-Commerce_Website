import React, { useEffect, useState, useContext } from 'react';
import '../styles/Home.css';
import Products from '../components/Products';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContext';

const Home = () => {
  const { fetchCategoryProducts, products, searchProducts } = useContext(GeneralContext); 
  const navigate = useNavigate();

  const [bannerImg, setBannerImg] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-banner');
      setBannerImg(response.data);
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  };

  // Fetch products based on the selected category
  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);            // Update the selected category
    await fetchCategoryProducts(category);    // Fetch products in this category
    navigate(`/category/${category}`);        // Navigate to the category route
  };

  return (
    <div className="HomePage">
      <div className="home-banner">
        {bannerImg ? <img src={bannerImg} alt="Home Banner" /> : ""}
      </div>

      <div className="home-categories-container">
        <div className="home-category-card" onClick={() => handleCategoryClick('Fashion')}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQjXpWVVQhkT_A2n03XMo2KDV4yPSLBcoNA&usqp=CAU" alt="Fashion" />
          <h5>Fashion</h5>
        </div>

        <div className="home-category-card" onClick={() => handleCategoryClick('Electronics')}>
          <img src="https://5.imimg.com/data5/ANDROID/Default/2023/1/SE/QC/NG/63182719/product-jpeg-500x500.jpg" alt="Electronics" />
          <h5>Electronics</h5>
        </div>

        <div className="home-category-card" onClick={() => handleCategoryClick('Mobiles')}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jUW7v1WFJL9Ylax9a4vazyKXwG-ktSinI4Rd7qi7MkhMr79UlIyyrNkbiK0Cz5u6WYw&usqp=CAU" alt="Mobiles" />
          <h5>Mobiles</h5>
        </div>

        <div className="home-category-card" onClick={() => handleCategoryClick('Groceries')}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbpV_yQ_zCtZt_1kNebjvFqXvdDnLuuJPsQ&usqp=CAU" alt="Groceries" />
          <h5>Groceries</h5>
        </div>

        <div className="home-category-card" onClick={() => handleCategoryClick('Sports-Equipment')}>
          <img src="https://a.storyblok.com/f/112937/568x464/82f66c3a21/all_the_english-_football_terms_you_need_to_know_blog-hero-low.jpg/m/620x0/filters:quality(70)/" alt="Sports Equipment" />
          <h5>Sports Equipment</h5>
        </div>
      </div>

      {/* Display products based on selected category */}
      <div id='products-body'>
        <Products category={selectedCategory} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
