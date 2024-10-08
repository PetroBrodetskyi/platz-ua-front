import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig.js';

export const addToCartBack = createAsyncThunk(
  'cart/addToCartBack',
  async (product, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      if (!user) throw new Error('Користувача не знайдено');

      const response = await axios.patch(`/users/cart`, {
        productId: product._id
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromCartBack = createAsyncThunk(
  'cart/removeFromCartBack',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      if (!user) throw new Error('Користувача не знайдено');

      const response = await axios.delete(`/users/cart`, {
        data: { productId }
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProductsInCart = createAsyncThunk(
  'products/fetchProductsInCart',
  async () => {
    const response = await axios.get('/users/cart');
    return response.data.reverse();
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    loading: false,
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (!existingProduct) {
        state.items.push(action.payload);
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('cart', JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartBack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartBack.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem('cart', JSON.stringify(action.payload));
        state.loading = false;
      })
      .addCase(addToCartBack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCartBack.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartBack.fulfilled, (state, action) => {
        state.items = action.payload;
        localStorage.setItem('cart', JSON.stringify(action.payload));
        state.loading = false;
      })
      .addCase(removeFromCartBack.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductsInCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsInCart.fulfilled, (state, action) => {
        if (JSON.stringify(state.items) !== JSON.stringify(action.payload)) {
          state.items = action.payload;
          localStorage.setItem('cart', JSON.stringify(action.payload));
        }
        state.loading = false;
      })
      .addCase(fetchProductsInCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addToCart, removeFromCart, setCartItems } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartLoading = (state) => state.cart.loading;

export default cartSlice.reducer;
