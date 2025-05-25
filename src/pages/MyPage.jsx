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
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (currentUser?.name) {
      setName(currentUser.name);
    }
  }, [currentUser]);

  const handleNameSubmit = () => {
    if (name.trim()) {
      updateUserName(name.trim());
      setName('');
      alert('이름이 저장되었습니다.');
    }
  };

  if (!currentUser) return null;

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
          <div className="name-input-row">
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleNameSubmit}>입력</button>
          </div>
          <p><strong>이메일:</strong> {currentUser.email}</p>
          <p><strong>가입일:</strong> {currentUser.createdAt}</p>
          <p><strong>작성한 다이어리 수:</strong> {entries.length}개</p>
        </div>
      </div>
    </div>
  );
}
