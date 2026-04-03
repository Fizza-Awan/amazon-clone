import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts } from '../services/productService';

const banners = [
  { id: 1, color: 'from-blue-800 to-blue-600', title: 'Great Indian Sale', subtitle: 'Up to 70% off on Mobile Phones', link: '/products?category=Mobile Phones' },
  { id: 2, color: 'from-green-800 to-green-600', title: 'Deals on Summer Fashion', subtitle: 'Starting ₹199', link: '/products?category=Fashion' },
  { id: 3, color: 'from-orange-700 to-orange-500', title: 'Home Essentials', subtitle: 'Starting ₹49', link: '/products?category=Home & Kitchen' },
  { id: 4, color: 'from-purple-800 to-purple-600', title: 'Electronics Mega Sale', subtitle: 'Up to 60% off', link: '/products?category=Electronics' },
];

const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', link: '/products?category=Electronics' },
  { name: 'Mobile Phones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', link: '/products?category=Mobile Phones' },
  { name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop', link: '/products?category=Home & Kitchen' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', link: '/products?category=Fashion' },
  { name: 'Books', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop', link: '/products?category=Books' },
];

const HomePage = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner Carousel */}
      <div className="relative overflow-hidden">
        <div
          className={`bg-gradient-to-r ${banners[currentBanner].color} text-white py-20 px-8 text-center transition-all duration-500`}
        >
          <h1 className="text-4xl font-bold mb-2">{banners[currentBanner].title}</h1>
          <p className="text-xl mb-4">{banners[currentBanner].subtitle}</p>
          <Link
            to={banners[currentBanner].link}
            className="bg-amazon-yellow text-black px-6 py-2 rounded font-medium hover:bg-yellow-500"
          >
            Shop Now
          </Link>
        </div>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              className={`w-2 h-2 rounded-full ${i === currentBanner ? 'bg-white' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Tiles */}
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {categories.map((cat) => (
            <Link key={cat.name} to={cat.link} className="bg-white rounded shadow hover:shadow-lg p-4 text-center transition-shadow hover:scale-105 transform duration-200">
              <img src={cat.image} alt={cat.name} className="w-full h-28 object-contain mb-3 rounded" />
              <p className="text-sm font-semibold text-gray-800">{cat.name}</p>
            </Link>
          ))}
        </div>

        {/* Featured Products */}
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded shadow p-4 animate-pulse">
                <div className="bg-gray-200 h-48 mb-3 rounded" />
                <div className="bg-gray-200 h-4 mb-2 rounded" />
                <div className="bg-gray-200 h-4 w-2/3 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <Link
            to="/products"
            className="bg-amazon-yellow hover:bg-yellow-500 text-black px-8 py-2 rounded font-medium"
          >
            See all products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;