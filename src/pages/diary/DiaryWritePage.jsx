import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import useDiaryStore from '../../store/useDiaryStore';
import useAuthStore from '../../store/useAuthStore';
import MusicSearchBox from '../../components/MusicSearchBox';
import './DiaryWritePage.css';

export default function DiaryWritePage() {
  const { entries, addEntry } = useDiaryStore();
  const { currentUser } = useAuthStore();
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMusic, setSelectedMusic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      const city = 'Seoul';
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data.weather?.[0]?.description || '정보 없음');
      } catch (err) {
        setWeather('불러오기 실패');
        console.error('날씨 fetch 실패:', err);
      }
    };

    fetchWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const newEntry = {
      id: Date.now(),
      date,
      weather,
      title,
      content,
      music: selectedMusic,
      createdAt: new Date().toISOString()
    };
    addEntry(currentUser.email, newEntry);
    navigate('/diary/view');
  };

  return (
    <div className="diary-write-container">
      <div className="title-row">
        <button onClick={() => navigate('/diary')} className="back-button"><FiArrowLeft size={20} /></button>
        <h2>✍️ 오늘의 다이어리</h2>
      </div>
      <p>📅 날짜: {date}</p>
      <p>🌤️ 날씨: {weather}</p>

      <div style={{ margin: '1rem 0' }}>
        <MusicSearchBox onSelect={(music) => setSelectedMusic(music)} />
      </div>

      {selectedMusic && (
        <div style={{ marginBottom: '1rem', fontSize: '0.95rem', color: '#333' }}>
          🎵 선택한 노래: <strong>{selectedMusic.name}</strong> - {selectedMusic.artist}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="오늘 있었던 일을 기록해보세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">💾 저장</button>
      </form>
    </div>
  );
}
