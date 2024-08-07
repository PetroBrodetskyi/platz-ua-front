import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';
import commentsReducer from './features/commentsSlice';
import authReducer from './features/authSlice';
import favoritesReducer from './features/favoritesSlice';
import cartReducer from './features/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
