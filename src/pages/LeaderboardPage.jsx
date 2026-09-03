import { useEffect } from 'react';
import { Award, Medal, Trophy } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboards } from '../states/leaderboardsSlice';

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const { items, error } = useSelector((state) => state.leaderboards);
  useEffect(() => { dispatch(fetchLeaderboards()); }, [dispatch]);
  return <section className="leaderboard-page"><div className="leaderboard-hero"><span className="eyebrow"><Trophy size={16} /> Kontributor terbaik</span><h1>Papan Apresiasi</h1><p>Untuk mereka yang aktif berbagi dan membuat ruang diskusi lebih hidup.</p></div>{error && <p className="form-error">{error}</p>}<div className="leaderboard-card"><div className="leaderboard-head"><span>Kontributor</span><span>Skor</span></div>{items.map((item, index) => <div className={`leader-row rank-${index + 1}`} key={item.user.id}><span className="rank">{index < 3 ? <Medal size={21} /> : index + 1}</span><img className="avatar" src={item.user.avatar} alt="" /><div className="leader-name"><strong>{item.user.name}</strong><span>{index === 0 ? 'Penjaga percakapan terbaik' : 'Kontributor aktif'}</span></div><strong className="score">{item.score} <small>pts</small></strong></div>)}</div><div className="leader-note"><Award /><div><strong>Bagaimana skor dihitung?</strong><p>Skor diperoleh dari aktivitas positif dan kontribusi dalam komunitas.</p></div></div></section>;
}
