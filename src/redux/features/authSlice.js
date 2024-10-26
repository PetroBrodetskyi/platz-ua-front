import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://platz-ua-back.vercel.app/api/users';

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (data) => {
    const response = await axios.post(`${API_URL}/google-auth`, data);
    return response.data;
  }
);

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
});

export const register = createAsyncThunk(
  'auth/register',
  async (credentials) => {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { getState, dispatch }) => {
    const { auth } = getState();

    if (!auth.token) {
      dispatch(logout());
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/current`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(logout());
      }
      return null;
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'auth/fetchUserById',
  async (userId, { getState, dispatch }) => {
    const response = await axios.get(`${API_URL}/${userId}`);
    const currentUserId = getState().auth.user?._id;

    const isFollowing = response.data.followers.includes(currentUserId);
    dispatch(setFollowingStatus(isFollowing));

    return response.data;
  }
);

export const updateUserDetails = createAsyncThunk(
  'auth/updateUserDetails',
  async (userDetails) => {
    const response = await axios.patch(`${API_URL}/update`, userDetails);
    return response.data;
  }
);

const initialState = {
  user: null,
  owner: null,
  token: localStorage.getItem('token') || null,
  likedUserAvatars: [],
  loading: false,
  error: null,
  isFollowing: false
};

// Функції для обробки стану
const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.error.message;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFollowingStatus: (state, action) => {
      state.isFollowing = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.owner = null;
      state.token = null;
      state.likedUserAvatars = [];
      state.isFollowing = false;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, handlePending)
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(googleLogin.rejected, handleRejected)
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, handleRejected)
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, handleRejected)
      .addCase(fetchCurrentUser.pending, handlePending)
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload || state.user;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(fetchUserById.pending, handlePending)
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.owner = action.payload;
        state.likedUserAvatars =
          action.payload.likedUsers?.map((user) => user.avatarURL) || [];
      })
      .addCase(fetchUserById.rejected, handleRejected)
      .addCase(updateUserDetails.pending, handlePending)
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserDetails.rejected, handleRejected);
  }
});

// Селектори
export const selectCurrentUser = (state) => state.auth.user;
export const selectOwner = (state) => state.auth.owner;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export const selectIsFollowing = (state) => state.auth.isFollowing;

export const { logout, setFollowingStatus } = authSlice.actions;

export default authSlice.reducer;
