import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import authReducer, { login } from './authSlice';
import threadsReducer, { populateThreads, voteThread } from './threadsSlice';
import uiReducer from './uiSlice';
import { api } from '../utils/api';

vi.mock('../utils/api', () => ({
  api: {
    login: vi.fn(),
    getOwnProfile: vi.fn(),
    getThreads: vi.fn(),
    getUsers: vi.fn(),
    voteThread: vi.fn(),
  },
  tokenStorage: { get: vi.fn(), set: vi.fn(), clear: vi.fn() },
}));

const makeStore = (preloadedState) => configureStore({
  reducer: { auth: authReducer, threads: threadsReducer, ui: uiReducer },
  preloadedState,
});

describe('asynchronous thunk functions', () => {
  beforeEach(() => vi.clearAllMocks());

  /**
   * Skenario: login berhasil
   * - API mengembalikan token dan profil.
   * - thunk harus menyimpan user serta notifikasi sukses.
   */
  it('should authenticate the user when login succeeds', async () => {
    api.login.mockResolvedValue({ token: 'token-123' });
    api.getOwnProfile.mockResolvedValue({ user: { id: 'user-1', name: 'Reza' } });
    const store = makeStore();
    const result = await store.dispatch(login({ email: 'reza@example.com', password: 'secret' }));
    expect(login.fulfilled.match(result)).toBe(true);
    expect(store.getState().auth.user.name).toBe('Reza');
    expect(store.getState().ui.loading).toBe(0);
  });

  /**
   * Skenario: login gagal
   * - API menolak kredensial.
   * - thunk harus rejected dan menyimpan pesan error.
   */
  it('should expose an error when login fails', async () => {
    api.login.mockRejectedValue(new Error('Email atau password salah'));
    const store = makeStore();
    const result = await store.dispatch(login({ email: 'wrong@example.com', password: 'secret' }));
    expect(login.rejected.match(result)).toBe(true);
    expect(store.getState().auth.error).toBe('Email atau password salah');
    expect(store.getState().ui.loading).toBe(0);
  });

  /**
   * Skenario: populate threads berhasil
   * - API thread dan user dipanggil paralel.
   * - hasil keduanya harus tersimpan di Redux Store.
   */
  it('should populate threads and users together', async () => {
    api.getThreads.mockResolvedValue({ threads: [{ id: 'thread-1' }] });
    api.getUsers.mockResolvedValue({ users: [{ id: 'user-1' }] });
    const store = makeStore();
    const result = await store.dispatch(populateThreads());
    expect(populateThreads.fulfilled.match(result)).toBe(true);
    expect(store.getState().threads.items).toHaveLength(1);
    expect(store.getState().threads.users).toHaveLength(1);
  });

  /**
   * Skenario: vote gagal setelah optimistic update
   * - vote diperbarui sebelum request.
   * - ketika API gagal, vote harus dikembalikan ke kondisi sebelumnya.
   */
  it('should roll back an optimistic vote when the API fails', async () => {
    api.voteThread.mockRejectedValue(new Error('Jaringan bermasalah'));
    const store = makeStore({
      auth: { user: null, initialized: true, error: null },
      threads: { items: [{ id: 'thread-1', upVotesBy: [], downVotesBy: [] }], users: [], category: 'Semua' },
      ui: { loading: 0, notification: null },
    });
    const result = await store.dispatch(voteThread({ id: 'thread-1', userId: 'user-1', voteType: 1, previousType: 0 }));
    expect(voteThread.rejected.match(result)).toBe(true);
    expect(store.getState().threads.items[0].upVotesBy).toEqual([]);
    expect(store.getState().ui.notification.message).toBe('Jaringan bermasalah');
  });
});
