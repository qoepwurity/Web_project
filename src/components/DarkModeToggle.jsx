import useDarkModeStore from '../store/useDarkModeStore';

export default function DarkModeToggle() {
  const { isDark, toggleDark } = useDarkModeStore();

  return (
    <button onClick={toggleDark} style={{
      position: 'fixed',
      top: '1rem',
      right: '1rem',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: isDark ? '#444' : '#444',
      color: isDark ? 'white' : 'black'
    }}>
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}