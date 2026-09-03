import { useSelector } from 'react-redux';

export default function LoadingBar({ full = false }) {
  const loading = useSelector((state) => state.ui.loading);
  if (!full && loading === 0) return null;
  if (full) return <div className="full-loader"><span /><p>Menyiapkan ruang diskusi...</p></div>;
  return <div className="loading-bar" role="progressbar"><span /></div>;
}
