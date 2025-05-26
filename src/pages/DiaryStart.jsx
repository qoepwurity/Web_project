// src/pages/DiaryStart.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryStart.css';

export default function DiaryStart() {
  const navigate = useNavigate();

  return (
    <div className="start-container">
      <div className="diary-icon-card">
        <span role="img" aria-label="diary" style={{ fontSize: '4rem' }}>📖</span>
        <h2>나만의 다이어리</h2>
        <button className="enter-button" onClick={() => navigate('/diary')}>
          입장
        </button>
      </div>
    </div>
  );
}
