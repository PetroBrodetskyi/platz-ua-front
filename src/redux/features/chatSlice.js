import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChats = createAsyncThunk(
  'chat/fetchChats',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://platz-ua-back.onrender.com/api/chat/chats?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Не вдалося завантажити чати'
      );
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    loading: false,
    error: null,
    selectedChat: null
  },
  reducers: {
    selectChat: (state, action) => {
      state.selectedChat = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
        state.error = null;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { selectChat } = chatSlice.actions;

export default chatSlice.reducer;
