import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axiosConfig.js';

export const fetchProductsByLocation = createAsyncThunk(
  'products/fetchProductsByLocation',
  async ({ PLZ, city, page = 1 }) => {
    const response = await axios.get(
      `/products/public?plz=${PLZ}&city=${city}&page=${page}`
    );
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1 }) => {
    const response = await axios.get(`/products/public?page=${page}`);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => {
    const response = await axios.get(`/products/public/${productId}`);
    return response.data;
  }
);

export const fetchUserProducts = createAsyncThunk(
  'products/fetchUserProducts',
  async () => {
    const response = await axios.get('/products');
    return response.data.reverse();
  }
);

export const fetchUsersPublicProducts = createAsyncThunk(
  'products/fetchUsersPublicProducts',
  async (userId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const response = await axios.get(`/products/user/${userId}`);
    return response.data.reverse();
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category) => {
    const response = await axios.get('/products/public/category', {
      params: { category }
    });
    return response.data.reverse();
  }
);

export const fetchExchangeRate = createAsyncThunk(
  'products/fetchExchangeRate',
  async () => {
    const response = await axios.get('/exchange-rate');
    return parseFloat(response.data.sale);
  }
);
