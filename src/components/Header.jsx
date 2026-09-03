import { LogIn, LogOut, MessageCircle, Plus, Trophy } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../states/authSlice';

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => { dispatch(logout()); navigate('/'); };
  return (
    <header className="header">
      <div className="header-inner">
        <Link className="brand" to="/"><span className="brand-mark"><MessageCircle size={20} /></span><span>Ruang<strong>Suara</strong></span></Link>
        <nav aria-label="Navigasi utama">
          <NavLink to="/" end>Diskusi</NavLink>
          <NavLink to="/leaderboard"><Trophy size={16} /> Peringkat</NavLink>
        </nav>
        <div className="header-actions">
          {user ? <>
            <Link className="button compact" to="/new"><Plus size={17} /> Buat diskusi</Link>
            <img className="avatar small" src={user.avatar} alt={user.name} title={user.name} />
            <button className="icon-button" onClick={signOut} title="Keluar"><LogOut size={19} /></button>
          </> : <Link className="button compact" to="/login"><LogIn size={17} /> Masuk</Link>}
        </div>
      </div>
    </header>
  );
}
