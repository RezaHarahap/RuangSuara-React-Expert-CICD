import { useEffect, useMemo } from 'react';
import { Filter, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadCard from '../components/ThreadCard';
import { populateThreads, setCategory, voteThread } from '../states/threadsSlice';
import { notify } from '../states/uiSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, users, category } = useSelector((state) => state.threads);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => { dispatch(populateThreads()); }, [dispatch]);
  const categories = useMemo(() => ['Semua', ...new Set(items.map((item) => item.category).filter(Boolean))], [items]);
  const visible = category === 'Semua' ? items : items.filter((item) => item.category === category);
  const handleVote = (thread, voteType, previousType) => {
    if (!user) { dispatch(notify({ type: 'error', message: 'Masuk terlebih dahulu untuk memberikan vote.' })); navigate('/login'); return; }
    dispatch(voteThread({ id: thread.id, voteType, previousType, userId: user.id }));
  };
  return (
    <div className="page-grid">
      <section>
        <div className="hero"><div><span className="eyebrow"><Sparkles size={15} /> Obrolan komunitas</span><h1>Ide tumbuh saat<br /><em>dibicarakan bersama.</em></h1><p>Temukan sudut pandang baru, bagikan pengetahuan, dan ikut membangun percakapan yang bermakna.</p></div><div className="hero-stat"><strong>{items.length}</strong><span>diskusi aktif</span></div></div>
        <div className="section-heading"><div><h2>Diskusi terbaru</h2><p>{visible.length} percakapan untuk dijelajahi</p></div><div className="filter-label"><Filter size={16} /> Filter</div></div>
        <div className="category-list">{categories.map((item) => <button className={category === item ? 'active' : ''} key={item} onClick={() => dispatch(setCategory(item))}>{item === 'Semua' ? item : `#${item}`}</button>)}</div>
        <div className="thread-list">{visible.map((thread) => <ThreadCard key={thread.id} thread={thread} owner={users.find((owner) => owner.id === thread.ownerId)} userId={user?.id} onVote={(voteType, previousType) => handleVote(thread, voteType, previousType)} />)}{visible.length === 0 && <div className="empty"><h3>Belum ada diskusi</h3><p>Kategori ini masih sepi. Jadilah pembuka percakapan.</p></div>}</div>
      </section>
      <aside className="sidebar"><div className="side-card accent"><span>Mulai dari rasa penasaran</span><h3>Ada hal yang ingin kamu diskusikan?</h3><button onClick={() => navigate(user ? '/new' : '/login')}>Buat diskusi baru</button></div><div className="side-card"><h3>Panduan ruang</h3><ol><li>Hormati setiap sudut pandang.</li><li>Sampaikan pendapat dengan jelas.</li><li>Bagikan sumber bila diperlukan.</li></ol></div></aside>
    </div>
  );
}
