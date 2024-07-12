import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post('https://platz-ua-back.vercel.app/api/users/login', credentials);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (credentials) => {
  const response = await axios.post('https://platz-ua-back.vercel.app/api/users/register', credentials);
  return response.data;
});

export const fetchUserById = createAsyncThunk('auth/fetchUserById', async (userId) => {
  if (!userId) {
    console.error("User ID is missing");
    throw new Error("User ID is required");
  }
  console.log('Fetching user with ID:', userId);
  const response = await axios.get(`https://platz-ua-back.vercel.app/api/users/${userId}`);
  console.log('User data:', response.data);
  return response.data;
});


export const updateUserDetails = createAsyncThunk('auth/updateUserDetails', async (formData, { getState }) => {
  const { auth } = getState();
  const response = await axios.patch(`https://platz-ua-back.vercel.app/api/users/${auth.user._id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${auth.token}`,
    },
  });
  return response.data;
});

const initialState = {
  user: null,
  owner: null,
  token: localStorage.getItem('token') || null,
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
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.owner = action.payload;
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