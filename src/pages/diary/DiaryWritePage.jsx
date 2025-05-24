import React, { useState, useEffect } from 'react';
import useDiaryStore from '../../store/useDiaryStore';
import './DiaryWritePage.css';

export default function DiaryWritePage() {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [music, setMusic] = useState('');
  const { entries, setEntries } = useDiaryStore();

  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    setDate(formatted);
  }, []);

  useEffect(() => {
    fetch('/api/weather')
      .then((res) => res.json())
      .then((data) => setWeather(data.weather || '알 수 없음'))
      .catch(() => setWeather('불러오기 실패'));
  }, []);

  const handleSave = () => {
    if (!title || !content) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      date,
      title,
      content,
      weather,
      music,
    };

    const updated = [...entries, newEntry];
    setEntries(updated);
    localStorage.setItem('diaryEntries', JSON.stringify(updated));
    alert('저장되었습니다!');
    setTitle('');
    setContent('');
  };

  return (
    <div className="diary-write-container">
      <h2>📝 오늘의 다이어리</h2>
      <div className="diary-meta">
        <p><strong>📅 날짜:</strong> {date}</p>
        <p><strong>🌤️ 날씨:</strong> {weather}</p>
      </div>
      <input
        className="diary-input"
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="diary-textarea"
        placeholder="오늘 있었던 일을 기록해보세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="save-button" onClick={handleSave}>💾 저장</button>
    </div>
  );
}

