import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSelector } from 'reselect';

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
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();

    if (!auth.token) {
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
        localStorage.removeItem('token');
        return rejectWithValue('Сесія завершена, будь ласка, увійдіть знову');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'auth/fetchUserById',
  async (userId) => {
    const response = await axios.get(`${API_URL}/${userId}`);
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
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.owner = null;
      state.token = null;
      state.likedUserAvatars = [];
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload || state.user;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.owner = action.payload;
        state.likedUserAvatars =
          action.payload.likedUsers?.map((user) => user.avatarURL) || [];
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.owner = null;
        state.error = action.error.message;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const selectCurrentUser = (state) => state.auth.user;
export const selectOwner = (state) => state.auth.owner;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
