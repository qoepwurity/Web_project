import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DiaryViewPage from './pages/diary/DiaryViewPage';
import DiaryWritePage from './pages/diary/DiaryWritePage';
import DiaryDetailPage from './pages/diary/DiaryDetailPage';
import QnaPage from './pages/QnaPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/diary/view" element={<DiaryViewPage />} />
        <Route path="/diary/write" element={<DiaryWritePage />} />
        <Route path="/diary/detail/:id" element={<DiaryDetailPage />} />
        <Route path="/qna" element={<QnaPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;