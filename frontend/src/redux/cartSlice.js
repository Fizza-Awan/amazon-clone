import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart';

const getConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const fetchCart = createAsyncThunk('cart/fetch', async (token, thunkAPI) => {
  try {
    const { data } = await axios.get(API_URL, getConfig(token));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const addToCart = createAsyncThunk('cart/add', async ({ token, item }, thunkAPI) => {
  try {
    const { data } = await axios.post(API_URL, item, getConfig(token));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const updateCartItem = createAsyncThunk('cart/update', async ({ token, productId, quantity }, thunkAPI) => {
  try {
    const { data } = await axios.put(`${API_URL}/${productId}`, { quantity }, getConfig(token));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const removeFromCart = createAsyncThunk('cart/remove', async ({ token, productId }, thunkAPI) => {
  try {
    const { data } = await axios.delete(`${API_URL}/${productId}`, getConfig(token));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const clearCart = createAsyncThunk('cart/clear', async (token, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/clear`, getConfig(token));
    return { items: [] };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCartLocal: (state) => { state.items = []; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => { state.items = action.payload.items || []; })
      .addCase(addToCart.fulfilled, (state, action) => { state.items = action.payload.items || []; })
      .addCase(updateCartItem.fulfilled, (state, action) => { state.items = action.payload.items || []; })
      .addCase(removeFromCart.fulfilled, (state, action) => { state.items = action.payload.items || []; })
      .addCase(clearCart.fulfilled, (state) => { state.items = []; });
  },
});

export const { clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;