import { useState } from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { register } from '../states/authSlice';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (user) return <Navigate to="/" replace />;
  const submit = async (event) => { event.preventDefault(); const result = await dispatch(register(form)); if (register.fulfilled.match(result)) navigate('/login'); };
  return <div className="auth-layout"><div className="auth-visual second"><Users size={42} /><blockquote>Setiap suara punya tempat. Mari tumbuh lewat percakapan yang sehat.</blockquote><span>Bergabung dengan RuangSuara</span></div><section className="auth-card"><span className="eyebrow">Buka akun gratis</span><h1>Gabung ke komunitas</h1><p>Mulai berbagi cerita, pengalaman, dan pengetahuanmu.</p><form onSubmit={submit}><label>Nama lengkap<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama kamu" minLength="3" required /></label><label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="nama@email.com" required /></label><label>Password<input type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Minimal 6 karakter" required /></label>{error && <p className="form-error">{error}</p>}<button className="button wide" type="submit">Buat akun <ArrowRight size={18} /></button></form><p className="auth-switch">Sudah punya akun? <Link to="/login">Masuk</Link></p></section></div>;
}
