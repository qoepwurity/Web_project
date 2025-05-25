import DarkModeToggle from './DarkModeToggle';
import './NavBar.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="nav-logo">📖 MyDiary</span>
      </div>
      <div className="nav-right">
        <DarkModeToggle />
      </div>
    </nav>
  );
}
