import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { loading: 0, notification: null },
  reducers: {
    showLoading: (state) => { state.loading += 1; },
    hideLoading: (state) => { state.loading = Math.max(0, state.loading - 1); },
    notify: (state, action) => { state.notification = { ...action.payload, id: Date.now() }; },
    clearNotification: (state) => { state.notification = null; },
  },
});

export const { showLoading, hideLoading, notify, clearNotification } = uiSlice.actions;
export default uiSlice.reducer;
