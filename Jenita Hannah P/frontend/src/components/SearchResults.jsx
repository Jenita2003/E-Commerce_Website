import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const SearchResults = () => {
  const { searchResults } = useContext(GeneralContext);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    // You can call searchProducts directly if needed on page load with query params
    if (query) {
      searchProducts(query);
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div key={product._id} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>{product.price}</span>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
