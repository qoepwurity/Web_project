import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './DiaryDetailPage.css';

export default function DiaryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('diaryEntries');
    if (stored) {
      const entries = JSON.parse(stored);
      const found = entries.find((e) => String(e.id) === String(id));
      if (found) {
        setEntry(found);
        setTitle(found.title);
        setContent(found.content);
      }
    }
  }, [id]);

  const handleDelete = () => {
    const stored = JSON.parse(localStorage.getItem('diaryEntries'));
    const updated = stored.filter((e) => String(e.id) !== String(id));
    localStorage.setItem('diaryEntries', JSON.stringify(updated));
    navigate('/diary/view');
  };

  const handleSave = () => {
    const stored = JSON.parse(localStorage.getItem('diaryEntries'));
    const updated = stored.map((e) =>
      String(e.id) === String(id) ? { ...e, title, content } : e
    );
    localStorage.setItem('diaryEntries', JSON.stringify(updated));
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
          <button className="back-button" onClick={() => navigate('/diary/view')}><FiArrowLeft size={20} /></button>
          <span>📅 {entry.date}</span>
          <span>🌦️ {entry.weather}</span>
        </div>
        {editMode ? (
          <>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="edit-input" />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} className="edit-textarea" />
            <button onClick={handleSave} className="save-button">저장</button>
          </>
        ) : (
          <>
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
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