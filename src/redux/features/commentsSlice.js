import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig.js';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (productId) => {
    const response = await axios.get(`/products/${productId}/comments`);
    return response.data;
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ productId, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/products/${productId}/comments`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const newComment = response.data.comments[response.data.comments.length - 1];
      return newComment;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      });
  },
});

export default commentsSlice.reducer;
