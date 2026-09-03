import { useEffect, useState } from 'react';
import { ArrowLeft, MessageSquare, Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CommentItem from '../components/CommentItem';
import VoteButtons from '../components/VoteButtons';
import { addComment, clearDetail, fetchThreadDetail, voteComment, voteDetailThread } from '../states/threadDetailSlice';
import { notify } from '../states/uiSlice';
import { plainText, postedAt } from '../utils/format';

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const { item, error } = useSelector((state) => state.threadDetail);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => { dispatch(fetchThreadDetail(id)); return () => { dispatch(clearDetail()); }; }, [dispatch, id]);
  const requireLogin = () => { if (user) return true; dispatch(notify({ type: 'error', message: 'Masuk terlebih dahulu untuk berinteraksi.' })); navigate('/login'); return false; };
  const submitComment = async (event) => { event.preventDefault(); if (!requireLogin()) return; const result = await dispatch(addComment({ threadId: id, content })); if (addComment.fulfilled.match(result)) setContent(''); };
  if (error) return <div className="empty"><h2>Diskusi tidak ditemukan</h2><p>{error}</p><Link to="/">Kembali</Link></div>;
  if (!item) return <div className="detail-skeleton" />;
  return <section className="detail-page"><Link className="back-link" to="/"><ArrowLeft size={17} /> Semua diskusi</Link><article className="detail-card"><span className="category">#{item.category || 'umum'}</span><h1>{item.title}</h1><div className="author-line"><img className="avatar" src={item.owner.avatar} alt="" /><div><strong>{item.owner.name}</strong><span>{postedAt(item.createdAt)}</span></div></div><p className="html-content thread-body">{plainText(item.body)}</p><VoteButtons upVotes={item.upVotesBy} downVotes={item.downVotesBy} userId={user?.id} onVote={(voteType, previousType) => { if (requireLogin()) dispatch(voteDetailThread({ id, voteType, previousType, userId: user.id })); }} /></article><div className="comments-section"><div className="section-heading"><div><h2><MessageSquare size={21} /> {item.comments.length} Komentar</h2><p>Ikut berkontribusi dalam diskusi ini</p></div></div>{user ? <form className="comment-form" onSubmit={submitComment}><img className="avatar" src={user.avatar} alt="" /><div><textarea rows="4" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tulis tanggapan yang konstruktif..." minLength="2" required /><button className="button compact" type="submit"><Send size={16} /> Kirim komentar</button></div></form> : <div className="login-prompt">Ingin ikut berdiskusi? <Link to="/login">Masuk ke akunmu</Link></div>}<div className="comment-list">{item.comments.map((comment) => <CommentItem key={comment.id} comment={comment} userId={user?.id} onVote={(voteType, previousType) => { if (requireLogin()) dispatch(voteComment({ threadId: id, commentId: comment.id, voteType, previousType, userId: user.id })); }} />)}</div></div></section>;
}
