import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messages: [],
  loading: false,
  error: null
};

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (chatId) => {
    const response = await axios.get(
      `https://platz-ua-back.vercel.app/api/chat/messages?chatId=${chatId}`
    );
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData) => {
    const response = await axios.post(
      'https://platz-ua-back.vercel.app/api/chat/messages',
      messageData
    );
    return response.data;
  }
);

export const editMessage = createAsyncThunk(
  'chat/editMessage',
  async ({ messageId, content }) => {
    const response = await axios.patch(
      `https://platz-ua-back.vercel.app/api/chat/messages/${messageId}`,
      { content }
    );
    return response.data;
  }
);

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (messageId) => {
    await axios.delete(
      `https://platz-ua-back.vercel.app/api/chat/messages/${messageId}`
    );
    return messageId;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(editMessage.fulfilled, (state, action) => {
        const index = state.messages.findIndex(
          (msg) => msg._id === action.payload._id
        );
        if (index !== -1) {
          state.messages[index].content = action.payload.content;
        }
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
          (msg) => msg._id !== action.payload
        );
      });
  }
});

export const selectMessages = (state) => state.chat.messages;
export const selectLoading = (state) => state.chat.loading;
export const selectError = (state) => state.chat.error;

export default chatSlice.reducer;
