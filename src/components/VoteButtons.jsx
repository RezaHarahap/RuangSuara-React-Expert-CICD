import { ThumbsDown, ThumbsUp } from 'lucide-react';
import PropTypes from 'prop-types';

export default function VoteButtons({ upVotes = [], downVotes = [], userId, onVote }) {
  const upActive = userId && upVotes.includes(userId);
  const downActive = userId && downVotes.includes(userId);
  return (
    <div className="vote-group">
      <button className={upActive ? 'active up' : ''} onClick={(event) => { event.preventDefault(); onVote(upActive ? 0 : 1, upActive ? 1 : downActive ? -1 : 0); }} aria-label="Up vote"><ThumbsUp size={16} /> {upVotes.length}</button>
      <button className={downActive ? 'active down' : ''} onClick={(event) => { event.preventDefault(); onVote(downActive ? 0 : -1, downActive ? -1 : upActive ? 1 : 0); }} aria-label="Down vote"><ThumbsDown size={16} /> {downVotes.length}</button>
    </div>
  );
}

VoteButtons.propTypes = {
  upVotes: PropTypes.arrayOf(PropTypes.string),
  downVotes: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string,
  onVote: PropTypes.func.isRequired,
};
