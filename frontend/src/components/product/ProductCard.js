import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => (
  <div className="flex text-amazon-yellow text-sm">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star}>
        {rating >= star ? <FaStar /> : rating >= star - 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
    ))}
  </div>
);

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAddToCart = () => {
    if (!userInfo) {
      window.location.href = '/login';
      return;
    }
    dispatch(addToCart({
      token: userInfo.token,
      item: {
        productId: product._id,
        name: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
      },
    }));
  };

  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition-shadow p-4 flex flex-col">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-3 hover:opacity-90"
        />
      </Link>

      <Link to={`/product/${product._id}`} className="flex-1">
        <h3 className="text-sm font-medium text-blue-700 hover:text-orange-500 hover:underline line-clamp-2 mb-1">
          {product.title}
        </h3>
      </Link>

      <div className="flex items-center gap-1 mb-1">
        <StarRating rating={product.rating?.rate || 0} />
        <span className="text-blue-600 text-xs hover:text-orange-500 cursor-pointer">
          ({product.rating?.count?.toLocaleString()})
        </span>
      </div>

      {product.prime && (
        <div className="flex items-center gap-1 mb-1">
          <span className="text-blue-700 font-bold text-xs italic">prime</span>
          <span className="text-xs text-gray-500">FREE Delivery</span>
        </div>
      )}

      <div className="mb-2">
        <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
        {product.mrp > product.price && (
          <span className="text-xs text-gray-500 line-through ml-2">
            M.R.P: ₹{product.mrp.toLocaleString()}
          </span>
        )}
        {discount > 0 && (
          <span className="text-xs text-red-600 ml-1">({discount}% off)</span>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-amazon-yellow hover:bg-yellow-500 text-black text-sm font-medium py-1.5 px-4 rounded-full w-full transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;