import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig.js';

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (productId) => {
    const response = await axios.get(`/products/${productId}/comments`);
    return { productId, comments: response.data };
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ productId, comment, user }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/products/${productId}/comments`,
        { text: comment, user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      const newComment = response.data.comments[response.data.comments.length - 1];
      return { productId, comment: { ...newComment, user } };
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
        const existingProductComments = state.comments.find(comment => comment.productId === action.payload.productId);
        if (existingProductComments) {
          existingProductComments.comments = action.payload.comments;
        } else {
          state.comments.push({ productId: action.payload.productId, comments: action.payload.comments });
        }
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { productId, comment } = action.payload;
        const existingProductComments = state.comments.find(c => c.productId === productId);
        if (existingProductComments) {
          existingProductComments.comments.unshift(comment);
        } else {
          state.comments.push({ productId, comments: [comment] });
        }
      });
  },
});

export default commentsSlice.reducer;
