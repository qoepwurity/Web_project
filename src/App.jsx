import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 페이지 임포트 (추후 실제 파일 연결)
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DiaryViewPage from './pages/diary/DiaryViewPage';
import DiaryWritePage from './pages/diary/DiaryWritePage';
import QnaPage from './pages/QnaPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/diary/view" element={<DiaryViewPage />} />
      <Route path="/diary/write" element={<DiaryWritePage />} />
      <Route path="/qna" element={<QnaPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
}

export default App;
