import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://platz-ua-back.vercel.app/api/users';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (credentials) => {
  const response = await axios.post(`${API_URL}/register`, credentials);
  return response.data;
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { getState, rejectWithValue }) => {
  const { auth } = getState();
  
  if (!auth.token) {
    // Пропускаємо дію, якщо токен відсутній
    return;
  }

  try {
    const response = await axios.get(`${API_URL}/current`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Автоматичний logout при 401 Unauthorized
      localStorage.removeItem('token');
      return rejectWithValue('Сесія завершена, будь ласка, увійдіть знову');
    }
    return rejectWithValue(error.message);
  }
});

export const fetchUserById = createAsyncThunk('auth/fetchUserById', async (userId, { rejectWithValue }) => {
  if (!userId) {
    return rejectWithValue('User ID is required');
  }
  
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateUserDetails = createAsyncThunk('auth/updateUserDetails', async (formData, { getState, rejectWithValue }) => {
  const { auth } = getState();
  
  if (!auth.token) {
    return rejectWithValue('Сесія завершена, будь ласка, увійдіть знову');
  }
  
  try {
    const response = await axios.patch(`${API_URL}/${auth.user._id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  user: null,
  owner: null,
  token: localStorage.getItem('token') || null,
  likedUserAvatars: [],
  loading: false,
  error: null,
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
    },
  },
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.owner = action.payload;
        state.likedUserAvatars = action.payload.likedUsers?.map(user => user.avatarURL) || [];
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
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
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
