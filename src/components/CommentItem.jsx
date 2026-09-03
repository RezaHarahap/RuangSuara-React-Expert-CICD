import { postedAt } from '../utils/format';
import { plainText } from '../utils/format';
import VoteButtons from './VoteButtons';

export default function CommentItem({ comment, userId, onVote }) {
  return (
    <article className="comment">
      <img className="avatar" src={comment.owner.avatar} alt="" />
      <div className="comment-content"><div className="comment-meta"><strong>{comment.owner.name}</strong><span>{postedAt(comment.createdAt)}</span></div><p className="html-content">{plainText(comment.content)}</p><VoteButtons upVotes={comment.upVotesBy} downVotes={comment.downVotesBy} userId={userId} onVote={onVote} /></div>
    </article>
  );
}
