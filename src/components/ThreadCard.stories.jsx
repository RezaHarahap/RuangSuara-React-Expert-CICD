import { MemoryRouter } from 'react-router-dom';
import ThreadCard from './ThreadCard';

export default {
  title: 'Forum/ThreadCard',
  component: ThreadCard,
  decorators: [(_Story) => <MemoryRouter><div style={{ width: 720 }}><_Story /></div></MemoryRouter>],
};

export const DiskusiReact = {
  args: {
    thread: { id: 'thread-story', title: 'Bagaimana membangun pengujian yang mudah dipelihara?', body: '<p>Mari berbagi strategi automation testing untuk proyek React.</p>', category: 'react', createdAt: new Date().toISOString(), upVotesBy: ['user-1', 'user-2'], downVotesBy: [], totalComments: 7 },
    owner: { name: 'Reza Harahap', avatar: 'https://ui-avatars.com/api/?name=Reza+Harahap' },
    userId: 'user-3',
    onVote: () => {},
  },
};
