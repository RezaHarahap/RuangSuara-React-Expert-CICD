import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { plainText, postedAt } from '../utils/format';
import VoteButtons from './VoteButtons';

export default function ThreadCard({ thread, owner, userId, onVote }) {
  return (
    <article className="thread-card">
      <div className="thread-top"><span className="category">#{thread.category || 'umum'}</span><span>{postedAt(thread.createdAt)}</span></div>
      <Link className="thread-link" to={`/threads/${thread.id}`}><h2>{thread.title}</h2><p>{plainText(thread.body).slice(0, 180)}{plainText(thread.body).length > 180 ? '…' : ''}</p></Link>
      <div className="thread-footer">
        <div className="owner"><img className="avatar" src={owner?.avatar} alt="" /><span>oleh <strong>{owner?.name || 'Pengguna'}</strong></span></div>
        <div className="engagement"><VoteButtons upVotes={thread.upVotesBy} downVotes={thread.downVotesBy} userId={userId} onVote={onVote} /><span className="comment-count"><MessageSquare size={16} /> {thread.totalComments}</span></div>
      </div>
    </article>
  );
}
