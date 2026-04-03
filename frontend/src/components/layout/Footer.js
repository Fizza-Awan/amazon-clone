import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      {/* Back to top */}
      <div
        className="bg-amazon-light text-white text-center py-3 text-sm cursor-pointer hover:bg-gray-600"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
      </div>

      {/* Links */}
      <div className="bg-amazon-dark text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-3">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">About Amazon</Link></li>
              <li><Link to="/" className="hover:underline">Careers</Link></li>
              <li><Link to="/" className="hover:underline">Press Releases</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Connect with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">Facebook</Link></li>
              <li><Link to="/" className="hover:underline">Twitter</Link></li>
              <li><Link to="/" className="hover:underline">Instagram</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Make Money with Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">Sell on Amazon</Link></li>
              <li><Link to="/" className="hover:underline">Advertise Your Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">Let Us Help You</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:underline">Your Account</Link></li>
              <li><Link to="/" className="hover:underline">Returns Centre</Link></li>
              <li><Link to="/" className="hover:underline">Help</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-amazon-dark border-t border-gray-600 py-4 text-center text-gray-400 text-sm">
        <p>© 2024 Amazon Clone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;