import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../redux/features/productsSlice.js';
import authReducer from '../redux/features/authSlice.js';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
  },
});

export default store;