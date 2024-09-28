import { createSlice } from "@reduxjs/toolkit";

const loadFavoritesFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("favorites");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load favorites from localStorage", e);
    return [];
  }
};

const saveFavoritesToLocalStorage = (favorites) => {
  try {
    const serializedState = JSON.stringify(favorites);
    localStorage.setItem("favorites", serializedState);
  } catch (e) {
    console.warn("Could not save favorites to localStorage", e);
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: loadFavoritesFromLocalStorage(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      if (state.items.includes(productId)) {
        state.items = state.items.filter((id) => id !== productId);
      } else {
        state.items.push(productId);
      }
      saveFavoritesToLocalStorage(state.items);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
