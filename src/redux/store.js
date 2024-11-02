import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import commentsReducer from './features/commentsSlice';
import authReducer from './features/authSlice';
import favoritesReducer from './features/favoritesSlice';
import cartReducer from './features/cartSlice';
import chatReducer from './features/chatSlice';
import { setupAxiosInterceptors } from './axiosConfig';

const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    chat: chatReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: import.meta.env.MODE !== 'production'
});

setupAxiosInterceptors(store);

export default store;
