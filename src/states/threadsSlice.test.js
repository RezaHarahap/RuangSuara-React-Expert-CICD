import threadsReducer, { optimisticVote, setCategory } from './threadsSlice';

const thread = {
  id: 'thread-1',
  title: 'Testing React',
  upVotesBy: ['user-1'],
  downVotesBy: ['user-2'],
};

const makeInitialState = () => ({
  items: [{
    ...thread,
    upVotesBy: [...thread.upVotesBy],
    downVotesBy: [...thread.downVotesBy],
  }],
  users: [],
  category: 'Semua',
});

describe('threadsSlice reducer', () => {
  /**
   * Skenario: category reducer
   * - harus menyimpan kategori yang dipilih pengguna.
   */
  it('should set the selected category', () => {
    const state = threadsReducer(undefined, setCategory('react'));
    expect(state.category).toBe('react');
  });

  /**
   * Skenario: optimistic up-vote
   * - harus memindahkan vote pengguna dari down-vote ke up-vote.
   */
  it('should move a vote to up-vote optimistically', () => {
    const initial = makeInitialState();
    const state = threadsReducer(initial, optimisticVote({ id: 'thread-1', userId: 'user-2', voteType: 1 }));
    expect(state.items[0].upVotesBy).toContain('user-2');
    expect(state.items[0].downVotesBy).not.toContain('user-2');
  });

  /**
   * Skenario: optimistic neutral-vote
   * - harus menghapus vote pengguna dari kedua daftar.
   */
  it('should neutralize an existing vote', () => {
    const initial = makeInitialState();
    const state = threadsReducer(initial, optimisticVote({ id: 'thread-1', userId: 'user-1', voteType: 0 }));
    expect(state.items[0].upVotesBy).not.toContain('user-1');
    expect(state.items[0].downVotesBy).not.toContain('user-1');
  });

  /**
   * Skenario: thread tidak ditemukan
   * - state harus tetap sama dan reducer tidak melempar error.
   */
  it('should leave state unchanged when the thread does not exist', () => {
    const initial = makeInitialState();
    const state = threadsReducer(initial, optimisticVote({ id: 'missing', userId: 'user-3', voteType: -1 }));
    expect(state).toEqual(initial);
  });
});
