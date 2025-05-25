import React, { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api';
import { useCart } from '../context/CartContext'; // Adjusted path

const Productos = () => {
  const { addToCart } = useCart(); // Get addToCart from context
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Products
      try {
        setLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }

      // Fetch Categories
      try {
        setLoadingCategories(true);
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        setLoadingCategories(false);
      } catch (err) {
        setErrorCategories(err.message);
        setLoadingCategories(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>

      <div className="mb-4 p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Categorías</h2>
        {loadingCategories && <span className="loading loading-spinner loading-sm"></span>}
        {errorCategories && <div className="text-red-500 text-sm">Error loading categories: {errorCategories}</div>}
        {!loadingCategories && !errorCategories && categories.length > 0 && (
          <div className="flex flex-wrap">
            {categories.map(category => (
              <button key={category.id} className="btn btn-sm btn-outline m-1">{category.name}</button>
            ))}
          </div>
        )}
        {!loadingCategories && !errorCategories && categories.length === 0 && (
          <p className="text-sm">No categories found.</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-3">Productos</h2>
        {loading && <span className="loading loading-spinner loading-lg mx-auto"></span>}
        {error && <div className="text-red-500 text-center">Error: {error}</div>}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <div key={product.id} className="card bg-base-100 shadow-xl">
                <figure className="h-48 w-full overflow-hidden"><img src={product.image || "https://via.placeholder.com/300x200?text=No+Image"} alt={product.name} className="h-full w-full object-cover" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{product.name}</h2>
                  <p className="text-sm h-16 overflow-y-auto">{product.description || "No description available."}</p>
                  <p className="text-lg font-semibold">Price: ${product.price}</p>
                  <div className="card-actions justify-end">
                    <button 
                      onClick={() => addToCart(product)} // Call addToCart with the product
                      className="btn btn-primary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && products.length === 0 && (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Productos;
