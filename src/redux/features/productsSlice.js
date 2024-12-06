import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig.js';
import { createSelector } from 'reselect';

const initialState = {
  products: [],
  selectedCategory: '',
  selectedSubcategories: [],
  userProducts: [],
  favorites: new Set(),
  exchangeRate: null,
  loading: false,
  location: '',
  error: null
};

const fetchProductsWithParams = async (url, params) => {
  const { data } = await axios.get(url, { params });
  return data;
};

// Thunks
export const fetchProductsByLocation = createAsyncThunk(
  'products/fetchProductsByLocation',
  async ({ PLZ, city, page = 1 }) =>
    fetchProductsWithParams('/products/public', { plz: PLZ, city, page })
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page = 1, category, subcategories = [], PLZ, city }) => {
    const params = {
      page,
      category,
      subcategories: subcategories.join(','),
      plz: PLZ,
      city
    };
    return fetchProductsWithParams('/products/public', params);
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId) => fetchProductsWithParams(`/products/public/${productId}`)
);

export const fetchUserProducts = createAsyncThunk(
  'products/fetchUserProducts',
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState().auth;

    if (!user) {
      return rejectWithValue('Користувач не авторизований');
    }

    try {
      const { data } = await axios.get('/products');
      return data.reverse();
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchUsersPublicProducts = createAsyncThunk(
  'products/fetchUsersPublicProducts',
  async (userId) => {
    if (!userId) throw new Error('User ID is required');
    return fetchProductsWithParams(`/products/user/${userId}`);
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category) =>
    fetchProductsWithParams('/products/public/category', { category })
);

export const fetchExchangeRate = createAsyncThunk(
  'products/fetchExchangeRate',
  async () => {
    const { data } = await axios.get('/exchange-rate');
    return parseFloat(data.sale);
  }
);

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      if (state.favorites.has(productId)) {
        state.favorites.delete(productId);
      } else {
        state.favorites.add(productId);
      }
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    clearProducts(state) {
      state.products = [];
    },
    setCategory(state, action) {
      state.selectedCategory = action.payload;
      state.selectedSubcategories = [];
    },
    setSubcategories(state, action) {
      state.selectedSubcategories = action.payload;
    }
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleFulfilled = (state, action) => {
      state.loading = false;
      const newProducts = new Set(state.products.map((p) => p._id));
      const filteredProducts = action.payload.filter(
        (product) => !newProducts.has(product._id)
      );
      state.products = [...state.products, ...filteredProducts];

      // Update favorites (handle duplicates in a Set)
      action.payload.forEach((product) => {
        if (product.favorite) {
          state.favorites.add(product._id);
        }
      });
    };

    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    };

    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, handleFulfilled)
      .addCase(fetchProducts.rejected, handleRejected)
      .addCase(fetchProductsByLocation.pending, handlePending)
      .addCase(fetchProductsByLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByLocation.rejected, handleRejected)
      .addCase(fetchProductById.pending, handlePending)
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, handleRejected)
      .addCase(fetchUserProducts.pending, handlePending)
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.userProducts = action.payload;
      })
      .addCase(fetchUserProducts.rejected, handleRejected)
      .addCase(fetchUsersPublicProducts.pending, handlePending)
      .addCase(fetchUsersPublicProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.userProducts = action.payload;
      })
      .addCase(fetchUsersPublicProducts.rejected, handleRejected)
      .addCase(fetchProductsByCategory.pending, handlePending)
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, handleRejected)
      .addCase(fetchExchangeRate.pending, handlePending)
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.loading = false;
        state.exchangeRate = action.payload;
      })
      .addCase(fetchExchangeRate.rejected, handleRejected);
  }
});

// Selectors
export const selectProducts = (state) => state.products.products;
export const selectFavorites = (state) => Array.from(state.products.favorites);
export const selectExchangeRate = (state) => state.products.exchangeRate;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;
export const selectProductById = (state, productId) => {
  return (
    state.products.products.find((product) => product._id === productId) ||
    state.products.product
  );
};

export const selectProductsByLocation = createSelector(
  [selectProducts, (state, PLZ, city) => ({ PLZ, city })],
  (products, { PLZ, city }) =>
    products.filter(
      (product) =>
        product.location.PLZ === PLZ && product.location.city === city
    )
);

export const selectFilteredProducts = createSelector(
  [
    selectProducts,
    (state, category, subcategories) => ({ category, subcategories })
  ],
  (products, { category, subcategories }) => {
    return products.filter(
      (product) =>
        (!category || product.category === category) &&
        (subcategories.length === 0 ||
          subcategories.every((sub) => product.subcategories.includes(sub)))
    );
  }
);

export const {
  toggleFavorite,
  setLocation,
  clearProducts,
  setCategory,
  setSubcategories
} = productsSlice.actions;

export default productsSlice.reducer;
