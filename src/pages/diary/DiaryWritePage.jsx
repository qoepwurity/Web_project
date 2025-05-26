import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import useDiaryStore from '../../store/useDiaryStore';
import useAuthStore from '../../store/useAuthStore';
import MusicSearchBox from '../../components/MusicSearchBox';
import './DiaryWritePage.css';

export default function DiaryWritePage() {
  const { addEntry } = useDiaryStore();
  const { currentUser } = useAuthStore();
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const formatted = now
      .toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      .replace(/\. /g, '-')
      .replace('.', '')
      .replace(/-(오전|오후)/, ' $1');
    setDate(formatted);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get('https://web-project-sand-psi.vercel.app/api/weather');
        setWeather(res.data.weather || '정보 없음');
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
      image: imagePreview,
      createdAt: new Date().toISOString()
    };
    addEntry(currentUser.email, newEntry);
    navigate('/diary/view');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(url);
    }
  };

  return (
    <div className="diary-write-container">
      <div className="title-row">
        <button onClick={() => navigate('/diary')} className="back-button">
          <FiArrowLeft size={20} />
        </button>
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
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {imagePreview && (
          <div style={{ margin: '1rem 0' }}>
            <img src={imagePreview} alt="미리보기" style={{ maxWidth: '100%', borderRadius: '8px' }} />
          </div>
        )}

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
