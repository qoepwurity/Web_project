import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import useAuthStore from '../../store/useAuthStore';
import './DiaryDetailPage.css';

export default function DiaryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();

  const [entry, setEntry] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!currentUser?.email) return;

    const key = `diaryEntries:${currentUser.email}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const entries = JSON.parse(stored);
      const found = entries.find((e) => String(e.id) === String(id));
      if (found) {
        setEntry(found);
        setTitle(found.title);
        setContent(found.content);
      }
    }
  }, [id, currentUser]);

  const handleDelete = () => {
    const key = `diaryEntries:${currentUser.email}`;
    const stored = JSON.parse(localStorage.getItem(key));
    const updated = stored.filter((e) => String(e.id) !== String(id));
    localStorage.setItem(key, JSON.stringify(updated));
    navigate('/diary/view');
  };

  const handleSave = () => {
    const key = `diaryEntries:${currentUser.email}`;
    const stored = JSON.parse(localStorage.getItem(key));
    const updated = stored.map((e) =>
      String(e.id) === String(id) ? { ...e, title, content } : e
    );
    localStorage.setItem(key, JSON.stringify(updated));
    setEditMode(false);
    setEntry({ ...entry, title, content });
  };

  if (!entry) {
    return (
      <div className="diary-detail-container">
        <h2>❌ 일기를 찾을 수 없습니다.</h2>
      </div>
    );
  }

  return (
    <div className="diary-detail-container">
      <div className="diary-detail-card">
        <div className="card-header">
          <button className="back-button" onClick={() => navigate('/diary/view')}>
            <FiArrowLeft size={20} />
          </button>
          <span>📅 {entry.date}</span>
          <span>날씨: {entry.weather}</span>
        </div>

        {editMode ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="edit-input"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="edit-textarea"
            />
            <button onClick={handleSave} className="save-button">저장</button>
          </>
        ) : (
          <>
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>

            {entry.image && (
              <div className="image-preview">
                <img
                  src={entry.image}
                  alt="첨부 이미지"
                  onClick={() => setLightboxOpen(true)}
                  style={{ maxWidth: '100%', borderRadius: '10px', cursor: 'zoom-in' }}
                />
              </div>
            )}

            {lightboxOpen && (
              <div
                className="lightbox"
                onClick={() => setLightboxOpen(false)}
              >
                <img
                  src={entry.image}
                  alt="확대 이미지"
                  className="lightbox-image"
                />
              </div>
            )}

            {entry.music && (
              <p style={{ marginTop: '1rem' }}>
                🎵 <strong>{entry.music.name}</strong> - {entry.music.artist}
              </p>
            )}

            <div className="button-row">
              <button onClick={() => setEditMode(true)} className="edit-button">수정</button>
              <button onClick={handleDelete} className="delete-button">삭제</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
