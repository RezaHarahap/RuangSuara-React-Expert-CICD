import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoadingBar from './components/LoadingBar';
import Notification from './components/Notification';
import { initializeAuth } from './states/authSlice';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotFoundPage from './pages/NotFoundPage';

function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const dispatch = useDispatch();
  const initialized = useSelector((state) => state.auth.initialized);
  useEffect(() => { dispatch(initializeAuth()); }, [dispatch]);

  if (!initialized) return <LoadingBar full />;
  return (
    <div className="app-shell">
      <LoadingBar />
      <Header />
      <Notification />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/new" element={<ProtectedRoute><CreateThreadPage /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer>RuangSuara · ruang untuk ide yang layak didengar</footer>
    </div>
  );
}
