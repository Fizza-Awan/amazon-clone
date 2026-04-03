const Cart = require('../models/cartModel');

const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (cart) {
    res.json(cart);
  } else {
    res.json({ items: [] });
  }
};

const addToCart = async (req, res) => {
  const { productId, name, image, price, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, name, image, price, quantity });
    }
    cart = await cart.save();
  } else {
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, name, image, price, quantity }],
    });
  }
  res.json(cart);
};

const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === req.params.productId
  );
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
};

const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );
  await cart.save();
  res.json(cart);
};

const clearCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  res.json({ message: 'Cart cleared' });
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };