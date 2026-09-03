import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createThread } from '../states/threadsSlice';

export default function CreateThreadPage() {
  const [form, setForm] = useState({ title: '', category: '', body: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submit = async (event) => { event.preventDefault(); const result = await dispatch(createThread(form)); if (createThread.fulfilled.match(result)) navigate(`/threads/${result.payload.id}`); };
  return <section className="form-page"><Link className="back-link" to="/"><ArrowLeft size={17} /> Kembali ke diskusi</Link><div className="form-card"><span className="eyebrow">Bagikan pemikiranmu</span><h1>Buat diskusi baru</h1><p>Judul yang jelas dan konteks yang cukup akan mengundang respons lebih baik.</p><form onSubmit={submit}><label>Judul diskusi<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Apa yang ingin kamu diskusikan?" minLength="5" required /></label><label>Kategori<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value.toLowerCase().trim() })} placeholder="Contoh: teknologi" required /></label><label>Isi diskusi<textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Ceritakan latar belakang dan pertanyaanmu..." rows="9" minLength="10" required /></label><div className="form-actions"><Link to="/">Batal</Link><button className="button" type="submit"><Send size={17} /> Terbitkan diskusi</button></div></form></div></section>;
}
