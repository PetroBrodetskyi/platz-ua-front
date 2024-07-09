import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  favorites: [],
  exchangeRate: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://platz-ua-back.vercel.app/api/products/public');
  return response.data;
});

export const fetchExchangeRate = createAsyncThunk('products/fetchExchangeRate', async () => {
  const response = await axios.get('https://platz-ua-back.vercel.app/api/exchange-rate');
  return parseFloat(response.data.sale);
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      if (state.favorites.includes(productId)) {
        state.favorites = state.favorites.filter((id) => id !== productId);
      } else {
        state.favorites.push(productId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.favorites = action.payload.filter(product => product.favorite).map(product => product._id);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.exchangeRate = action.payload;
      });
  },
});

export const { toggleFavorite } = productsSlice.actions;

export default productsSlice.reducer;
