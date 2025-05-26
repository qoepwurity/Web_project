import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import useDiaryStore from '../../store/useDiaryStore';
import useAuthStore from '../../store/useAuthStore';
import './DiaryViewPage.css';

export default function DiaryViewPage() {
  const { entries, loadEntries } = useDiaryStore();
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    if (currentUser?.email) {
      loadEntries(currentUser.email);
    }
  }, [currentUser, loadEntries]);

  const handleViewDetail = (id) => {
    navigate(`/diary/detail/${id}`);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const filteredEntries = useMemo(() => {
    const filtered = entries.filter((entry) =>
      entry.title.includes(searchTerm) || entry.content.includes(searchTerm)
    );

    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date);
      const dateB = new Date(b.createdAt || b.date);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [entries, searchTerm, sortOrder]);

  return (
    <div className="diary-view-wrapper">
      <div className="diary-list-outer">
        <div className="diary-list-container">
          <div className="diary-header-box">
            <div className="title-row">
              <button onClick={() => navigate('/diary')} className="back-button">
                <FiArrowLeft size={20} />
              </button>
              <h2>📚 나의 다이어리 목록</h2>
            </div>

            <div className="search-sort-row" style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <input
                type="text"
                placeholder="검색어 입력 (제목/내용)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                  height: '40px',
                  boxSizing: 'border-box',
                  marginBottom: '40px'
                }}
              />
              <button
                onClick={toggleSortOrder}
                style={{
                  padding: '0 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  cursor: 'pointer',
                  height: '40px',
                  fontSize: '1rem',
                  marginTop: '14px'
                }}
              >
                {sortOrder === 'asc' ? '오래된순' : '최신순'}
              </button>
            </div>
          </div>

          {filteredEntries.length === 0 ? (
            <p className="empty">조건에 맞는 다이어리가 없습니다.</p>
          ) : (
            <div className="diary-list">
              {filteredEntries.map((entry) => (
                <div className="diary-card clickable" key={entry.id} onClick={() => handleViewDetail(entry.id)}>
                  <div className="card-header">
                    <span className="date">📅 {entry.date}</span>
                    <span className="weather">날씨: {entry.weather}</span>
                  </div>
                  <h3 className="clickable-title">{entry.title}</h3>
                  <p>{entry.content.length > 100 ? entry.content.slice(0, 100) + '...' : entry.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
