import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axiosConfig.js';

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (productId) => {
    const { data } = await axios.get(`/products/${productId}/comments`);
    return { productId, comments: data };
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ productId, comment, user }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `/products/${productId}/comments`,
        { text: comment, user },
        getAuthHeaders()
      );
      const newComment = data.comments[data.comments.length - 1];
      return { productId, comment: { ...newComment, user } };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ productId, commentId }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `/products/${productId}/comments/${commentId}`,
        getAuthHeaders()
      );
      return { productId, commentId };
    } catch (error) {
      console.error('Delete comment error:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addReply = createAsyncThunk(
  'comments/addReply',
  async ({ productId, commentId, reply, user }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(
        `/products/${productId}/comments/${commentId}/replies`,
        { text: reply, user },
        getAuthHeaders()
      );
      return { productId, commentId, reply: { ...data.reply, user } };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReply = createAsyncThunk(
  'comments/deleteReply',
  async ({ productId, commentId, replyId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/products/${productId}/comments/${commentId}/replies/${replyId}`,
        getAuthHeaders()
      );
      return { productId, commentId, replyId };
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
    error: null
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };

    const handleFetchFulfilled = (state, { payload }) => {
      state.loading = false;
      const existingProductComments = state.comments.find(
        (comment) => comment.productId === payload.productId
      );

      if (existingProductComments) {
        existingProductComments.comments = payload.comments;
      } else {
        state.comments.push({
          productId: payload.productId,
          comments: payload.comments
        });
      }
    };

    const handleAddCommentFulfilled = (state, { payload }) => {
      const existingProductComments = state.comments.find(
        (c) => c.productId === payload.productId
      );

      if (existingProductComments) {
        existingProductComments.comments.push(payload.comment);
      } else {
        state.comments.push({
          productId: payload.productId,
          comments: [payload.comment]
        });
      }
    };

    const handleDeleteCommentFulfilled = (state, { payload }) => {
      state.comments = state.comments.map((comment) => {
        if (comment.productId === payload.productId) {
          return {
            ...comment,
            comments: comment.comments.filter(
              (c) => c._id !== payload.commentId
            )
          };
        }
        return comment;
      });
    };

    builder
      .addCase(fetchComments.pending, handlePending)
      .addCase(fetchComments.fulfilled, handleFetchFulfilled)
      .addCase(fetchComments.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(addComment.fulfilled, handleAddCommentFulfilled)
      .addCase(deleteComment.fulfilled, handleDeleteCommentFulfilled)
      .addCase(addReply.fulfilled, (state, { payload }) => {
        const productComments = state.comments.find(
          (c) => c.productId === payload.productId
        );
        const comment = productComments.comments.find(
          (c) => c._id === payload.commentId
        );
        comment.replies.push(payload.reply);
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        const { productId, commentId, replyId } = action.payload;
        const productComments = state.comments.find(
          (comment) => comment.productId === productId
        );
        const comment = productComments.comments.find(
          (c) => c._id === commentId
        );
        comment.replies = comment.replies.filter(
          (reply) => reply._id !== replyId
        );
      });
  }
});

export default commentsSlice.reducer;
