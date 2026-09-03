import VoteButtons from './VoteButtons';

export default { title: 'Forum/VoteButtons', component: VoteButtons, args: { onVote: () => {} } };

export const Netral = { args: { userId: 'user-1', upVotes: ['user-2', 'user-3'], downVotes: ['user-4'] } };
export const UpVoteAktif = { args: { userId: 'user-1', upVotes: ['user-1', 'user-2'], downVotes: [] } };
