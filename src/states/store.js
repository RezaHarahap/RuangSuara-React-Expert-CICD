import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import threads from './threadsSlice';
import threadDetail from './threadDetailSlice';
import leaderboards from './leaderboardsSlice';
import ui from './uiSlice';

export default configureStore({ reducer: { auth, threads, threadDetail, leaderboards, ui } });
