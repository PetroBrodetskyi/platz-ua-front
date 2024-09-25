import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig.js';
import { createSelector } from 'reselect';

const initialState = {
  products: [],
  userProducts: [],
  favorites: [],
  exchangeRate: null,
  loading: false,
  location: '',
  error: null,
};

export const fetchProductsByLocation = createAsyncThunk('products/fetchProductsByLocation', async ({ PLZ, city, page = 1 }) => {
  const response = await axios.get(`/products/public?plz=${PLZ}&city=${city}&page=${page}`);
  return response.data;
});

export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ page = 1 }) => {
  const response = await axios.get(`/products/public?page=${page}`);
  return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (productId) => {
  const response = await axios.get(`/products/public/${productId}`);
  return response.data;
});

export const fetchUserProducts = createAsyncThunk('products/fetchUserProducts', async () => {
  const response = await axios.get('/products');
  return response.data.reverse();
});

export const fetchUsersPublicProducts = createAsyncThunk('products/fetchUsersPublicProducts', async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  const response = await axios.get(`/products/user/${userId}`);
  return response.data.reverse();
});

export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory', async (category) => {
  const response = await axios.get('/products/public/category', {
    params: { category },
  });
  return response.data.reverse();
});

export const fetchExchangeRate = createAsyncThunk('products/fetchExchangeRate', async () => {
  const response = await axios.get('/exchange-rate');
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
    setLocation(state, action) {
      state.location = action.payload;
    },
    clearProducts(state) {
      state.products = [];
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
        const newProducts = action.payload;
        const existingProductIds = new Set(state.products.map((product) => product._id));

        const filteredNewProducts = newProducts.filter((product) => !existingProductIds.has(product._id));

        state.products = [...state.products, ...filteredNewProducts];
        state.favorites = [
          ...state.favorites,
          ...filteredNewProducts.filter((product) => product.favorite).map((product) => product._id),
        ];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsByLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.userProducts = action.payload;
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsersPublicProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersPublicProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.userProducts = action.payload;
      })
      .addCase(fetchUsersPublicProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchExchangeRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.loading = false;
        state.exchangeRate = action.payload;
      })
      .addCase(fetchExchangeRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectProducts = (state) => state.products.products;

export const selectFavorites = (state) => state.products.favorites;

export const selectExchangeRate = (state) => state.products.exchangeRate;

export const selectLoading = (state) => state.products.loading;

export const selectError = (state) => state.products.error;

export const selectProductById = (state, productId) => state.products.products.find((product) => product._id === productId);

export const selectProductsByLocation = createSelector(
  [selectProducts, (state, PLZ, city) => ({ PLZ, city })],
  (products, { PLZ, city }) => products.filter(product => product.location.PLZ === PLZ && product.location.city === city)
);

export const { toggleFavorite, setLocation, clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
