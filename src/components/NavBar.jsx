import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-logo">📖 MyDiary</div>
      <ul className="nav-links">
        <li className={location.pathname === '/' ? 'active' : ''}><Link to="/">홈</Link></li>
        <li className={location.pathname.startsWith('/diary/view') ? 'active' : ''}><Link to="/diary/view">다이어리 목록</Link></li>
        <li className={location.pathname.startsWith('/diary/write') ? 'active' : ''}><Link to="/diary/write">작성하기</Link></li>
        <li className={location.pathname === '/qna' ? 'active' : ''}><Link to="/qna">QnA</Link></li>
        <li className={location.pathname === '/mypage' ? 'active' : ''}><Link to="/mypage">마이페이지</Link></li>
      </ul>
    </nav>
  );
}