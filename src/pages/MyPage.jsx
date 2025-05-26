import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import useAuthStore from '../store/useAuthStore';
import useDiaryStore from '../store/useDiaryStore';
import { useEffect, useState } from 'react';
import './MyPage.css';

export default function MyPage() {
  const navigate = useNavigate();
  const { currentUser, isLoggedIn, updateUserName } = useAuthStore();
  const { entries } = useDiaryStore();
  const [name, setName] = useState('');

  useEffect(() => {
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      navigate('/');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser?.name) {
      setName(currentUser.name);
    }
  }, [currentUser]);

  const handleNameSubmit = () => {
    if (!name.trim()) return;

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      createdAt: currentUser.createdAt || new Date().toISOString()
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    updateUserName(updatedUser.name);

    alert('이름이 저장되었습니다.');
  };


  if (!currentUser) return null;

  const formatJoinDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
      .replace(/\. /g, '-')
      .replace('.', '')
      .replace(/-(오전|오후)/, ' $1');
  };

  return (
    <div className="mypage-container">
      <div className="mypage-card">
        <div className="title-row">
          <button onClick={() => navigate('/diary')} className="back-button">
            <FiArrowLeft size={20} />
          </button>
          <h2>👤 마이페이지</h2>
        </div>
        <div className="profile-box">
          <p><strong>이름:</strong> {currentUser.name || '입력되지 않음'}</p>
          <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
            <input
              type="text"
              placeholder="이름 입력"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                flex: '0 0 180px',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '6px',
                fontSize: '1rem',
                height: '20px',
                marginTop: '12px'
              }}
            />
            <button onClick={handleNameSubmit} className='name-input-row' style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              marginBottom: '15px'
            }}>입력</button>
          </div>
          <p><strong>이메일:</strong> {currentUser.email}</p>
          <p><strong>가입일:</strong> {formatJoinDate(currentUser.createdAt)}</p>
          <p><strong>작성한 다이어리 수:</strong> {entries.length}개</p>
        </div>
      </div>
    </div>
  );
}
