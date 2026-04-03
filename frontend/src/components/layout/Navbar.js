import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { clearCartLocal } from '../../redux/cartSlice';
import { FiSearch, FiShoppingCart, FiMapPin } from 'react-icons/fi';
import { FaAmazon } from 'react-icons/fa';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?keyword=${searchTerm}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCartLocal());
    navigate('/');
  };

  return (
    <nav className="bg-amazon-dark text-white sticky top-0 z-50">
      {/* Main navbar */}
      <div className="flex items-center px-4 py-2 gap-2">
        {/* Logo */}
        <Link to="/" className="flex items-center border-2 border-transparent hover:border-white px-2 py-1 mr-2">
          <FaAmazon className="text-amazon-yellow text-3xl" />
          <span className="text-amazon-yellow font-bold text-xl">.in</span>
        </Link>

        {/* Delivery location */}
        <div className="hidden md:flex items-center border-2 border-transparent hover:border-white px-2 py-1 cursor-pointer">
          <FiMapPin className="text-white text-lg" />
          <div className="ml-1">
            <p className="text-gray-400 text-xs">Deliver to</p>
            <p className="text-white text-xs font-bold">India</p>
          </div>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex flex-1 mx-2">
          <select className="bg-gray-200 text-black text-sm px-2 rounded-l-md border-none outline-none hidden md:block">
            <option>All</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
            <option>Kitchen</option>
            <option>Beauty</option>
            <option>Sports</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Amazon.in"
            className="flex-1 px-4 py-2 text-black text-sm outline-none"
          />
          <button type="submit" className="bg-amazon-yellow px-4 rounded-r-md hover:bg-yellow-500">
            <FiSearch className="text-black text-xl" />
          </button>
        </form>

        {/* Account */}
        <div className="relative group border-2 border-transparent hover:border-white px-2 py-1 cursor-pointer">
          <p className="text-xs text-gray-300">
            Hello, {userInfo ? userInfo.name.split(' ')[0] : 'Sign in'}
          </p>
          <p className="text-sm font-bold">Account & Lists</p>
          {/* Dropdown */}
          <div className="absolute right-0 top-full hidden group-hover:block bg-white text-black shadow-lg rounded z-50 w-48 p-2">
            {userInfo ? (
              <>
                <p className="px-3 py-1 text-sm font-bold border-b">
                  {userInfo.name}
                </p>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-sm hover:bg-gray-100">
                  Sign In
                </Link>
                <Link to="/register" className="block px-3 py-2 text-sm hover:bg-gray-100">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Orders */}
        <Link to="/orders" className="hidden md:block border-2 border-transparent hover:border-white px-2 py-1">
          <p className="text-xs text-gray-300">Returns</p>
          <p className="text-sm font-bold">& Orders</p>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="flex items-center border-2 border-transparent hover:border-white px-2 py-1">
          <div className="relative">
            <FiShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-amazon-yellow text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <span className="ml-1 font-bold text-sm hidden md:block">Cart</span>
        </Link>
      </div>

      {/* Sub navbar */}
      <div className="bg-amazon-light px-4 py-1 flex items-center gap-4 text-sm overflow-x-auto">
        <Link to="/products" className="hover:border hover:border-white px-2 py-1 whitespace-nowrap">All</Link>
        <Link to="/products?category=Mobile%20Phones" className="hover:border hover:border-white px-2 py-1 whitespace-nowrap">Mobile Phones</Link>
        <Link to="/products?category=Electronics" className="hover:border hover:border-white px-2 py-1 whitespace-nowrap">Electronics</Link>
        <Link to="/products?category=Fashion" className="hover:border hover:border-white px-2 py-1 whitespace-nowrap">Fashion</Link>
        <Link to="/products?category=Books" className="hover:border hover:border-white px-2 py-1 whitespace-nowrap">Books</Link>
        <Link to="/products?category=Home%20%26%20Kitchen" className="hover:border hover:border-white px-2 py-1 whitespace-nowrap">Home & Kitchen</Link>
      </div>
    </nav>
  );
};

export default Navbar;