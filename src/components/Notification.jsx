import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2, X, XCircle } from 'lucide-react';
import { clearNotification } from '../states/uiSlice';

export default function Notification() {
  const item = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() => { if (!item) return undefined; const timer = setTimeout(() => dispatch(clearNotification()), 3500); return () => clearTimeout(timer); }, [dispatch, item]);
  if (!item) return null;
  return <div className={`toast ${item.type}`} role="status">{item.type === 'success' ? <CheckCircle2 /> : <XCircle />}<span>{item.message}</span><button onClick={() => dispatch(clearNotification())}><X size={16} /></button></div>;
}
