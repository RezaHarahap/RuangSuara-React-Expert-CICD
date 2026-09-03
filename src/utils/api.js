const BASE_URL = 'https://forum-api.dicoding.dev/v1';
const TOKEN_KEY = 'ruangsuara_access_token';

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

async function request(path, options = {}) {
  const token = tokenStorage.get();
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  const result = await response.json();
  if (!response.ok || result.status === 'fail') throw new Error(result.message || 'Permintaan gagal diproses.');
  return result.data;
}

const votePath = (type) => (type === 1 ? 'up-vote' : type === -1 ? 'down-vote' : 'neutral-vote');

export const api = {
  register: (payload) => request('/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/login', { method: 'POST', body: JSON.stringify(payload) }),
  getOwnProfile: () => request('/users/me'),
  getUsers: () => request('/users'),
  getThreads: () => request('/threads'),
  getThreadDetail: (id) => request(`/threads/${id}`),
  createThread: (payload) => request('/threads', { method: 'POST', body: JSON.stringify(payload) }),
  createComment: (id, content) => request(`/threads/${id}/comments`, { method: 'POST', body: JSON.stringify({ content }) }),
  voteThread: (id, type) => request(`/threads/${id}/${votePath(type)}`, { method: 'POST' }),
  voteComment: (threadId, commentId, type) => request(`/threads/${threadId}/comments/${commentId}/${votePath(type)}`, { method: 'POST' }),
  getLeaderboards: () => request('/leaderboards'),
};
