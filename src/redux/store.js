import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';
import authReducer from './features/authSlice';
import favoritesReducer from './features/favoritesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    favorites: favoritesReducer
  }
});

export default store;
