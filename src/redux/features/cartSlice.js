import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Не вдалося завантажити стан з localStorage', e);
    return [];
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.warn('Не вдалося зберегти стан в localStorage', e);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadFromLocalStorage()
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.unshift(action.payload);
      saveToLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      saveToLocalStorage(state.items);
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
