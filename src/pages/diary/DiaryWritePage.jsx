import React, { useState, useEffect } from 'react';
import useDiaryStore from '../../store/useDiaryStore';

export default function DiaryWritePage() {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState(''); // 날씨 텍스트
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [music, setMusic] = useState('');
  const { entries, setEntries } = useDiaryStore();

  // 날짜 초기화
  useEffect(() => {
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    setDate(formatted);
  }, []);

  // 날씨 불러오기 (서버리스 연결 예정)
  useEffect(() => {
    fetch('/api/weather')
      .then((res) => res.json())
      .then((data) => setWeather(data.weather || '알 수 없음'))
      .catch(() => setWeather('불러오기 실패'));
  }, []);

  // 저장
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
    <div style={{ padding: '1rem' }}>
      <h2>📝 오늘의 다이어리</h2>
      <p>📅 날짜: {date}</p>
      <p>🌤️ 날씨: {weather}</p>

      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
      />

      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ display: 'block', height: '150px', width: '100%' }}
      />

      <button onClick={handleSave} style={{ marginTop: '1rem' }}>
        💾 저장
      </button>
    </div>
  );
}
