import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig.js';

const checkUser = (user) => {
  if (!user) throw new Error('Користувача не знайдено');
};

export const addToCartBack = createAsyncThunk(
  'cart/addToCartBack',
  async (product, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      checkUser(user);
      const { data } = await axios.patch('/users/cart', {
        productId: product._id
      });
      return data.cart;
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
      checkUser(user);
      const { data } = await axios.delete(`/users/cart/${productId}`);
      return data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProductsInCart = createAsyncThunk(
  'products/fetchProductsInCart',
  async () => {
    const { data } = await axios.get('/users/cart');
    return data;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addToCart: (state, { payload }) => {
      if (!state.items.some((item) => item._id === payload._id)) {
        state.items.push(payload);
      }
    },
    removeFromCart: (state, { payload }) => {
      state.items = state.items.filter((item) => item._id !== payload);
    },
    setCartItems: (state, { payload }) => {
      state.items = payload;
    }
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleFulfilled = (state, { payload }) => {
      state.items = payload;
      localStorage.setItem('cart', JSON.stringify(payload));
      state.loading = false;
    };

    const handleRejected = (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    };

    builder
      .addCase(addToCartBack.pending, handlePending)
      .addCase(addToCartBack.fulfilled, handleFulfilled)
      .addCase(addToCartBack.rejected, handleRejected)
      .addCase(removeFromCartBack.pending, handlePending)
      .addCase(removeFromCartBack.fulfilled, handleFulfilled)
      .addCase(removeFromCartBack.rejected, handleRejected)
      .addCase(fetchProductsInCart.pending, handlePending)
      .addCase(fetchProductsInCart.fulfilled, (state, { payload }) => {
        const isCartDifferent =
          state.items.length !== payload.length ||
          state.items.some((item, index) => item._id !== payload[index]._id);

        if (isCartDifferent) {
          handleFulfilled(state, { payload });
        } else {
          state.loading = false; // No change in cart
        }
      })
      .addCase(fetchProductsInCart.rejected, handleRejected);
  }
});

export const { addToCart, removeFromCart, setCartItems } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartLoading = (state) => state.cart.loading;

export default cartSlice.reducer;
