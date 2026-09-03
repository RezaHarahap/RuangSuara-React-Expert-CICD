import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../utils/api';
import { hideLoading, notify, showLoading } from './uiSlice';

export const populateThreads = createAsyncThunk('threads/populate', async (_, { dispatch, rejectWithValue }) => {
  dispatch(showLoading());
  try { const [threadData, userData] = await Promise.all([api.getThreads(), api.getUsers()]); return { threads: threadData.threads, users: userData.users }; }
  catch (error) { dispatch(notify({ type: 'error', message: error.message })); return rejectWithValue(error.message); }
  finally { dispatch(hideLoading()); }
});

export const createThread = createAsyncThunk('threads/create', async (payload, { dispatch, rejectWithValue }) => {
  dispatch(showLoading());
  try { const data = await api.createThread(payload); dispatch(notify({ type: 'success', message: 'Diskusi berhasil diterbitkan.' })); return data.thread; }
  catch (error) { dispatch(notify({ type: 'error', message: error.message })); return rejectWithValue(error.message); } finally { dispatch(hideLoading()); }
});

export const voteThread = createAsyncThunk('threads/vote', async ({ id, voteType, previousType, userId }, { dispatch, rejectWithValue }) => {
  dispatch(optimisticVote({ id, voteType, userId }));
  try { await api.voteThread(id, voteType); return { id, voteType }; }
  catch (error) { dispatch(optimisticVote({ id, voteType: previousType, userId })); dispatch(notify({ type: 'error', message: error.message })); return rejectWithValue(error.message); }
});

const threadsSlice = createSlice({
  name: 'threads', initialState: { items: [], users: [], category: 'Semua' },
  reducers: {
    setCategory: (state, action) => { state.category = action.payload; },
    optimisticVote: (state, action) => {
      const thread = state.items.find((item) => item.id === action.payload.id);
      if (!thread) return;
      thread.upVotesBy = thread.upVotesBy.filter((id) => id !== action.payload.userId);
      thread.downVotesBy = thread.downVotesBy.filter((id) => id !== action.payload.userId);
      if (action.payload.voteType === 1) thread.upVotesBy.push(action.payload.userId);
      if (action.payload.voteType === -1) thread.downVotesBy.push(action.payload.userId);
    },
  },
  extraReducers: (builder) => builder
    .addCase(populateThreads.fulfilled, (state, action) => { state.items = action.payload.threads; state.users = action.payload.users; })
    .addCase(createThread.fulfilled, (state, action) => { state.items.unshift(action.payload); }),
});

export const { setCategory, optimisticVote } = threadsSlice.actions;
export default threadsSlice.reducer;
