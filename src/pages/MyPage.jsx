import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './MyPage.css';

export default function Mypage() {
  const navigate = useNavigate();
  const user = {
    name: '홍길동',
    email: 'hong@example.com',
    joinDate: '2024-01-10'
  };

  return (
    <div className="mypage-container">
      <div className="mypage-card">
        <div className="title-row">
          <button onClick={() => navigate('/')} className="back-button"><FiArrowLeft size={20} /></button>
          <h2>👤 마이페이지</h2>
        </div>
        <div className="profile-box">
          <p><strong>이름:</strong> {user.name}</p>
          <p><strong>이메일:</strong> {user.email}</p>
          <p><strong>가입일:</strong> {user.joinDate}</p>
        </div>
      </div>
    </div>
  );
}