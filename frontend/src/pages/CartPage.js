import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../redux/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) dispatch(fetchCart(userInfo.token));
  }, [dispatch, userInfo]);

  const subtotal = items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const totalItems = items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem({ token: userInfo.token, productId, quantity }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ token: userInfo.token, productId }));
  };

  const handleClearCart = () => {
    dispatch(clearCart(userInfo.token));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <h1 className="text-3xl font-medium mb-4">Shopping Cart</h1>

      {!items || items.length === 0 ? (
        <div className="bg-white rounded shadow p-8 text-center">
          <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
          <Link to="/products" className="bg-amazon-yellow hover:bg-yellow-500 text-black px-6 py-2 rounded font-medium">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Cart items */}
          <div className="flex-1 bg-white rounded shadow p-4">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-lg font-medium">Cart Items ({totalItems})</h2>
              <button
                onClick={handleClearCart}
                className="text-sm text-red-500 hover:text-red-700 hover:underline"
              >
                Clear Cart
              </button>
            </div>

            {items.map((item) => (
              <div key={item.product} className="flex gap-4 py-4 border-b last:border-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex-1">
                  <Link
                    to={`/product/${item.product}`}
                    className="text-sm text-blue-700 hover:text-orange-500 hover:underline line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-green-600 text-sm mt-1">In Stock</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => handleQuantityChange(item.product, item.quantity - 1)}
                        className="px-2 py-1 text-sm hover:bg-gray-100 border-r"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product, item.quantity + 1)}
                        className="px-2 py-1 text-sm hover:bg-gray-100 border-l"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.product)}
                      className="text-sm text-blue-600 hover:text-orange-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                  <p className="text-xs text-gray-500">₹{item.price.toLocaleString()} each</p>
                </div>
              </div>
            ))}

            <div className="text-right mt-4">
              <p className="text-lg">
                Subtotal ({totalItems} items):{' '}
                <span className="font-bold">₹{subtotal.toLocaleString()}</span>
              </p>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:w-72">
            <div className="bg-white rounded shadow p-4">
              <p className="text-lg mb-3">
                Subtotal ({totalItems} items):{' '}
                <span className="font-bold">₹{subtotal.toLocaleString()}</span>
              </p>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-amazon-yellow hover:bg-yellow-500 text-black py-2 rounded font-medium text-sm"
              >
                Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;