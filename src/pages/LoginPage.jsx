import { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from '../states/authSlice';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (user) return <Navigate to="/" replace />;
  const submit = async (event) => { event.preventDefault(); const result = await dispatch(login(form)); if (login.fulfilled.match(result)) navigate('/'); };
  return <div className="auth-layout"><div className="auth-visual"><MessageCircle size={42} /><blockquote>“Percakapan yang baik tidak selalu menghasilkan kesepakatan, tetapi selalu menambah pemahaman.”</blockquote><span>— RuangSuara</span></div><section className="auth-card"><span className="eyebrow">Selamat datang kembali</span><h1>Masuk ke ruangmu</h1><p>Lanjutkan percakapan dan temukan ide baru.</p><form onSubmit={submit}><label>Email<input data-testid="email-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="nama@email.com" required /></label><label>Password<input data-testid="password-input" type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Minimal 6 karakter" required /></label>{error && <p className="form-error">{error}</p>}<button data-testid="login-button" className="button wide" type="submit">Masuk <ArrowRight size={18} /></button></form><p className="auth-switch">Belum punya akun? <Link to="/register">Daftar sekarang</Link></p></section></div>;
}
