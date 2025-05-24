import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import useDiaryStore from '../../store/useDiaryStore';
import './DiaryViewPage.css';

export default function DiaryViewPage() {
  const { entries, setEntries } = useDiaryStore();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('diaryEntries');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, [setEntries]);

  const handleViewDetail = (id) => {
    navigate(`/diary/detail/${id}`);
  };

  return (
    <div className="diary-list-container">
      <div className="title-row">
        <button onClick={() => navigate('/')} className="back-button"><FiArrowLeft size={20} /></button>
        <h2>📚 나의 다이어리 목록</h2>
      </div>
      {entries.length === 0 ? (
        <p className="empty">작성된 다이어리가 없습니다.</p>
      ) : (
        <div className="diary-list">
          {entries.map((entry) => (
            <div className="diary-card clickable" key={entry.id} onClick={() => handleViewDetail(entry.id)}>
              <div className="card-header">
                <span className="date">📅 {entry.date}</span>
                <span className="weather">🌤️ {entry.weather}</span>
              </div>
              <h3 className="clickable-title">{entry.title}</h3>
              <p>{entry.content.length > 100 ? entry.content.slice(0, 100) + '...' : entry.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}