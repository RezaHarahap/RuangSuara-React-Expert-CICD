import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api, tokenStorage } from '../utils/api';
import { hideLoading, notify, showLoading } from './uiSlice';

export const initializeAuth = createAsyncThunk('auth/initialize', async (_, { dispatch }) => {
  if (!tokenStorage.get()) return null;
  try { return (await api.getOwnProfile()).user; } catch { tokenStorage.clear(); dispatch(notify({ type: 'error', message: 'Sesi berakhir. Silakan masuk kembali.' })); return null; }
});

export const login = createAsyncThunk('auth/login', async (credentials, { dispatch, rejectWithValue }) => {
  dispatch(showLoading());
  try {
    const data = await api.login(credentials);
    tokenStorage.set(data.token);
    const user = (await api.getOwnProfile()).user;
    dispatch(notify({ type: 'success', message: `Selamat datang, ${user.name}!` }));
    return user;
  } catch (error) { return rejectWithValue(error.message); } finally { dispatch(hideLoading()); }
});

export const register = createAsyncThunk('auth/register', async (payload, { dispatch, rejectWithValue }) => {
  dispatch(showLoading());
  try { await api.register(payload); dispatch(notify({ type: 'success', message: 'Akun berhasil dibuat. Silakan masuk.' })); return true; }
  catch (error) { return rejectWithValue(error.message); } finally { dispatch(hideLoading()); }
});

const authSlice = createSlice({
  name: 'auth', initialState: { user: null, initialized: false, error: null },
  reducers: {
    logout: (state) => { tokenStorage.clear(); state.user = null; state.error = null; },
    clearAuthError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => builder
    .addCase(initializeAuth.fulfilled, (state, action) => { state.user = action.payload; state.initialized = true; })
    .addCase(initializeAuth.rejected, (state) => { state.initialized = true; })
    .addCase(login.fulfilled, (state, action) => { state.user = action.payload; state.error = null; })
    .addCase(login.rejected, (state, action) => { state.error = action.payload; })
    .addCase(register.fulfilled, (state) => { state.error = null; })
    .addCase(register.rejected, (state, action) => { state.error = action.payload; }),
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
