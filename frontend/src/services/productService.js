import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const fetchProducts = async (keyword = '', category = '') => {
  const params = new URLSearchParams();
  if (keyword) params.append('keyword', keyword);
  if (category) params.append('category', category);
  const { data } = await axios.get(`${API_URL}?${params.toString()}`);
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await axios.get(`${API_URL}/categories`);
  return data;
};