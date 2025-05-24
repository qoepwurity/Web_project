import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>📖 나만의 다이어리</h1>
      <p>오늘의 기록을 남기고 추억을 저장해보세요.</p>

      <div className="home-buttons">
        <button onClick={() => navigate('/diary/write')}>✍️ 작성하기</button>
        <button onClick={() => navigate('/diary/view')}>📚 다이어리 목록</button>
        <button onClick={() => navigate('/mypage')}>👤 마이페이지</button>
        <button onClick={() => navigate('/qna')}>❓ QnA 게시판</button>
      </div>
    </div>
  );
}