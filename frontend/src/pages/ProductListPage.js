import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts, fetchCategories } from '../services/productService';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const keyword = query.get('keyword') || '';
  const categoryParam = query.get('category') || '';

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(keyword, selectedCategory);
        let sorted = [...data];
        if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price);
        if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
        setProducts(sorted);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [keyword, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 flex gap-4">
      {/* Sidebar filters */}
      <div className="w-48 shrink-0 hidden md:block">
        <div className="bg-white rounded shadow p-4">
          <h3 className="font-bold text-lg mb-3 border-b pb-2">Filters</h3>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Category</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`hover:text-orange-500 ${!selectedCategory ? 'font-bold text-orange-500' : ''}`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`hover:text-orange-500 ${selectedCategory === cat ? 'font-bold text-orange-500' : ''}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Sort By</h4>
            <ul className="space-y-1 text-sm">
              {[
                { value: '', label: 'Featured' },
                { value: 'price-low', label: 'Price: Low to High' },
                { value: 'price-high', label: 'Price: High to Low' },
                { value: 'rating', label: 'Avg. Customer Review' },
              ].map((opt) => (
                <li key={opt.value}>
                  <button
                    onClick={() => setSortBy(opt.value)}
                    className={`hover:text-orange-500 ${sortBy === opt.value ? 'font-bold text-orange-500' : ''}`}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">
            {keyword ? `Results for "${keyword}"` : selectedCategory || 'All Products'}
            <span className="text-gray-500 text-sm ml-2">({products.length} results)</span>
          </h2>

          {/* Mobile sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="md:hidden border rounded px-2 py-1 text-sm"
          >
            <option value="">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Avg. Rating</option>
          </select>
        </div>

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
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;