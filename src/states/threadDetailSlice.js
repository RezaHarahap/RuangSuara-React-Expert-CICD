import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../utils/api';
import { hideLoading, notify, showLoading } from './uiSlice';

export const fetchThreadDetail = createAsyncThunk('threadDetail/fetch', async (id, { dispatch, rejectWithValue }) => {
  dispatch(showLoading());
  try { return (await api.getThreadDetail(id)).detailThread; }
  catch (error) { dispatch(notify({ type: 'error', message: error.message })); return rejectWithValue(error.message); } finally { dispatch(hideLoading()); }
});

export const addComment = createAsyncThunk('threadDetail/comment', async ({ threadId, content }, { dispatch, rejectWithValue }) => {
  dispatch(showLoading());
  try { const comment = (await api.createComment(threadId, content)).comment; dispatch(notify({ type: 'success', message: 'Komentar berhasil ditambahkan.' })); return comment; }
  catch (error) { dispatch(notify({ type: 'error', message: error.message })); return rejectWithValue(error.message); } finally { dispatch(hideLoading()); }
});

export const voteDetailThread = createAsyncThunk('threadDetail/voteThread', async ({ id, voteType, previousType, userId }, { dispatch, rejectWithValue }) => {
  dispatch(optimisticThreadVote({ voteType, userId }));
  try { await api.voteThread(id, voteType); } catch (error) { dispatch(optimisticThreadVote({ voteType: previousType, userId })); dispatch(notify({ type: 'error', message: error.message })); return rejectWithValue(error.message); }
});

export const voteComment = createAsyncThunk('threadDetail/voteComment', async ({ threadId, commentId, voteType, previousType, userId }, { dispatch, rejectWithValue }) => {
  dispatch(optimisticCommentVote({ commentId, voteType, userId }));
  try { await api.voteComment(threadId, commentId, voteType); } catch (error) { dispatch(optimisticCommentVote({ commentId, voteType: previousType, userId })); dispatch(notify({ type: 'error', message: error.message })); return rejectWithValue(error.message); }
});

const applyVote = (target, userId, voteType) => {
  target.upVotesBy = target.upVotesBy.filter((id) => id !== userId);
  target.downVotesBy = target.downVotesBy.filter((id) => id !== userId);
  if (voteType === 1) target.upVotesBy.push(userId);
  if (voteType === -1) target.downVotesBy.push(userId);
};

const slice = createSlice({
  name: 'threadDetail', initialState: { item: null, error: null },
  reducers: {
    clearDetail: (state) => { state.item = null; state.error = null; },
    optimisticThreadVote: (state, action) => { if (state.item) applyVote(state.item, action.payload.userId, action.payload.voteType); },
    optimisticCommentVote: (state, action) => { const comment = state.item?.comments.find((item) => item.id === action.payload.commentId); if (comment) applyVote(comment, action.payload.userId, action.payload.voteType); },
  },
  extraReducers: (builder) => builder
    .addCase(fetchThreadDetail.fulfilled, (state, action) => { state.item = action.payload; state.error = null; })
    .addCase(fetchThreadDetail.rejected, (state, action) => { state.error = action.payload; })
    .addCase(addComment.fulfilled, (state, action) => { state.item.comments.unshift(action.payload); }),
});

export const { clearDetail, optimisticThreadVote, optimisticCommentVote } = slice.actions;
export default slice.reducer;
