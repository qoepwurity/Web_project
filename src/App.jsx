import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DiaryViewPage from './pages/diary/DiaryViewPage';
import DiaryWritePage from './pages/diary/DiaryWritePage';
import DiaryDetailPage from './pages/diary/DiaryDetailPage';
import QnaPage from './pages/QnaPage';
import MyPage from './pages/MyPage';
import ProtectedRoute from './routes/ProtectedRoute';
import useDarkModeStore from './store/useDarkModeStore';
import DiaryStart from './pages/DiaryStart';

function App() {
  const { isDark } = useDarkModeStore();

  useEffect(() => {
    const body = document.body;
    if (isDark) body.classList.add('dark');
    else body.classList.remove('dark');
  }, [isDark]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/dashboard" element={<DiaryStart />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/diary" element={<HomePage />} />
        <Route
          path="/diary/view"
          element={
            <ProtectedRoute>
              <DiaryViewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diary/write"
          element={
            <ProtectedRoute>
              <DiaryWritePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diary/detail/:id"
          element={
            <ProtectedRoute>
              <DiaryDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diary/qna"
          element={
            <ProtectedRoute>
              <QnaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diary/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
