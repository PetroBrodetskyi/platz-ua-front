import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import commentsReducer from "./features/commentsSlice";
import authReducer from "./features/authSlice";
import favoritesReducer from "./features/favoritesSlice";
import cartReducer from "./features/cartSlice";
import { setupAxiosInterceptors } from "./axiosConfig";

const store = configureStore({
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
  devTools: import.meta.env.MODE !== "production",
});

setupAxiosInterceptors(store);

export default store;
