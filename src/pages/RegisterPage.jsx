import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import useDarkModeStore from '../store/useDarkModeStore';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const { isDark } = useDarkModeStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [isDark]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (email && password) {
      const success = register(email, password);
      if (success) {
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/');
      } else {
        alert('이미 등록된 이메일입니다.');
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          background: 'var(--card-bg)',
          color: 'var(--text-color)',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}
      >
        <h2>회원가입</h2>
        <form
          onSubmit={handleRegister}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '1.5rem'
          }}
        >
          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '0.75rem',
              borderRadius: '6px',
              boxSizing: 'border-box',
              width: '100%'
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '0.75rem',
              borderRadius: '6px',
              boxSizing: 'border-box',
              width: '100%'
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              padding: '0.6rem',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            회원가입
          </button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          이미 계정이 있으신가요?{' '}
          <span
            style={{ color: '#007acc', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            로그인
          </span>
        </p>
      </div>
    </div>
  );
}