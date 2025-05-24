import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import useDiaryStore from '../../store/useDiaryStore';
import './DiaryWritePage.css';

export default function DiaryWritePage() {
  const { entries, setEntries } = useDiaryStore();
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  useEffect(() => {
    fetch('/api/weather')
      .then((res) => res.json())
      .then((data) => setWeather(data.weather || '알 수 없음'))
      .catch(() => setWeather('불러오기 실패'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      date,
      weather,
      title,
      content
    };
    const updated = [...entries, newEntry];
    setEntries(updated);
    localStorage.setItem('diaryEntries', JSON.stringify(updated));
    navigate('/diary/view');
  };

  return (
    <div className="diary-write-container">
      <div className="title-row">
        <button onClick={() => navigate('/')} className="back-button"><FiArrowLeft size={20} /></button>
        <h2>✍️ 오늘의 다이어리</h2>
      </div>
      <p>📅 날짜: {date}</p>
      <p>🌤️ 날씨: {weather}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="오늘 있었던 일을 기록해보세요…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">💾 저장</button>
      </form>
    </div>
  );
}