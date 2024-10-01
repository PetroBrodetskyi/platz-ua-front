import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProductsByLocation,
  fetchProducts,
  fetchProductById,
  fetchUserProducts,
  fetchUsersPublicProducts,
  fetchProductsByCategory,
  fetchExchangeRate
} from './productsThunks';

const initialState = {
  products: [],
  userProducts: [],
  favorites: [],
  exchangeRate: null,
  loading: false,
  location: '',
  error: null
};

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
    }
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
        const existingProductIds = new Set(
          state.products.map((product) => product._id)
        );

        const filteredNewProducts = newProducts.filter(
          (product) => !existingProductIds.has(product._id)
        );

        state.products = [...state.products, ...filteredNewProducts];
        state.favorites = [
          ...state.favorites,
          ...filteredNewProducts
            .filter((product) => product.favorite)
            .map((product) => product._id)
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
  }
});

export const { toggleFavorite, setLocation, clearProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
