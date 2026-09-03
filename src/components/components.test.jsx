import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ThreadCard from './ThreadCard';
import VoteButtons from './VoteButtons';

const renderThread = (overrides = {}) => render(
  <MemoryRouter>
    <ThreadCard
      thread={{
        id: 'thread-1', title: 'Belajar Automation Testing', body: '<p>Isi diskusi yang aman.</p>',
        category: 'react', createdAt: new Date().toISOString(), upVotesBy: [], downVotesBy: [], totalComments: 2,
        ...overrides,
      }}
      owner={{ name: 'Reza', avatar: 'https://example.com/avatar.png' }}
      userId="user-1"
      onVote={vi.fn()}
    />
  </MemoryRouter>,
);

describe('React components', () => {
  /**
   * Skenario: ThreadCard dirender
   * - harus menampilkan judul, kategori, pemilik, dan jumlah komentar.
   */
  it('should render the important thread information', () => {
    renderThread();
    expect(screen.getByRole('heading', { name: 'Belajar Automation Testing' })).toBeInTheDocument();
    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('Reza')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  /**
   * Skenario: isi HTML thread
   * - markup HTML dari API harus ditampilkan sebagai teks, bukan dieksekusi.
   */
  it('should show API HTML content as safe plain text', () => {
    renderThread({ body: '<strong>Konten aman</strong><script>alert(1)</script>' });
    expect(screen.getByText(/Konten aman/)).toBeInTheDocument();
    expect(document.querySelector('script')).not.toBeInTheDocument();
  });

  /**
   * Skenario: pengguna belum up-vote
   * - klik up-vote harus mengirim voteType 1 dan previousType 0.
   */
  it('should request an up-vote from a neutral state', () => {
    const onVote = vi.fn();
    render(<VoteButtons userId="user-1" upVotes={[]} downVotes={[]} onVote={onVote} />);
    fireEvent.click(screen.getByRole('button', { name: 'Up vote' }));
    expect(onVote).toHaveBeenCalledWith(1, 0);
  });

  /**
   * Skenario: pengguna sudah up-vote
   * - klik tombol aktif harus mengirim neutral vote.
   */
  it('should neutralize an active up-vote', () => {
    const onVote = vi.fn();
    render(<VoteButtons userId="user-1" upVotes={['user-1']} downVotes={[]} onVote={onVote} />);
    fireEvent.click(screen.getByRole('button', { name: 'Up vote' }));
    expect(onVote).toHaveBeenCalledWith(0, 1);
  });
});
