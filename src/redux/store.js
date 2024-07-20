import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';
import authReducer from './features/authSlice';
import favoritesReducer from './features/favoritesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    favorites: favoritesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
