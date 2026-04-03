import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { fetchProductById } from '../services/productService';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => (
  <div className="flex text-amazon-yellow">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star}>
        {rating >= star ? <FaStar /> : rating >= star - 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
      </span>
    ))}
  </div>
);

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!userInfo) return navigate('/login');
    dispatch(addToCart({
      token: userInfo.token,
      item: {
        productId: product._id,
        name: product.title,
        image: product.image,
        price: product.price,
        quantity,
      },
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
      <div className="flex gap-8">
        <div className="bg-gray-200 w-96 h-96 rounded" />
        <div className="flex-1">
          <div className="bg-gray-200 h-8 mb-4 rounded" />
          <div className="bg-gray-200 h-4 mb-2 rounded" />
          <div className="bg-gray-200 h-4 w-1/2 rounded" />
        </div>
      </div>
    </div>
  );

  if (!product) return <div className="text-center py-16">Product not found</div>;

  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-white mt-4 rounded shadow">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="md:w-1/3">
          <img src={product.image} alt={product.title} className="w-full object-contain max-h-96" />
        </div>

        {/* Details */}
        <div className="md:w-1/2">
          <h1 className="text-xl font-medium mb-2">{product.title}</h1>
          <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>

          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating?.rate || 0} />
            <span className="text-blue-600 text-sm">
              {product.rating?.count?.toLocaleString()} ratings
            </span>
          </div>

          <div className="border-t border-b py-3 mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-medium">₹{product.price.toLocaleString()}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-gray-500 line-through text-sm">
                    M.R.P: ₹{product.mrp.toLocaleString()}
                  </span>
                  <span className="text-red-600 text-sm">({discount}% off)</span>
                </>
              )}
            </div>
            {product.prime && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-blue-700 font-bold text-sm italic">prime</span>
                <span className="text-sm text-gray-600">FREE Delivery</span>
              </div>
            )}
          </div>

          <p className="text-sm text-gray-700 mb-4">{product.description}</p>
          <p className="text-sm font-medium text-green-600">In Stock</p>
        </div>

        {/* Buy box */}
        <div className="md:w-1/5">
          <div className="border rounded p-4">
            <p className="text-2xl font-medium mb-1">₹{product.price.toLocaleString()}</p>
            {product.mrp > product.price && (
              <p className="text-xs text-gray-500 line-through mb-1">
                M.R.P: ₹{product.mrp.toLocaleString()}
              </p>
            )}
            {product.prime && (
              <p className="text-blue-700 font-bold text-sm italic mb-2">prime FREE Delivery</p>
            )}
            <p className="text-green-600 text-sm mb-3">In Stock</p>

            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm mb-3 w-full"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
              ))}
            </select>

            <button
              onClick={handleAddToCart}
              className="w-full bg-amazon-yellow hover:bg-yellow-500 text-black py-2 rounded text-sm font-medium mb-2"
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            <button
              onClick={() => { handleAddToCart(); navigate('/cart'); }}
              className="w-full bg-orange-400 hover:bg-orange-500 text-black py-2 rounded text-sm font-medium"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;