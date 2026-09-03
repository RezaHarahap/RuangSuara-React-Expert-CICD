import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <div className="empty not-found"><strong>404</strong><h1>Ruang ini tidak ditemukan</h1><p>Mungkin percakapannya sudah pindah ke tempat lain.</p><Link className="button" to="/">Kembali ke beranda</Link></div>;
}
