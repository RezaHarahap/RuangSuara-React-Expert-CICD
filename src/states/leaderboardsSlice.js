import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../utils/api';
import { hideLoading, showLoading } from './uiSlice';

export const fetchLeaderboards = createAsyncThunk('leaderboards/fetch', async (_, { dispatch, rejectWithValue }) => {
  dispatch(showLoading());
  try { return (await api.getLeaderboards()).leaderboards; }
  catch (error) { return rejectWithValue(error.message); } finally { dispatch(hideLoading()); }
});

const slice = createSlice({ name: 'leaderboards', initialState: { items: [], error: null }, reducers: {}, extraReducers: (builder) => builder
  .addCase(fetchLeaderboards.fulfilled, (state, action) => { state.items = action.payload; })
  .addCase(fetchLeaderboards.rejected, (state, action) => { state.error = action.payload; }) });

export default slice.reducer;
