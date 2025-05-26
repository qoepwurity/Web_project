import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      alert('로그인 후 사용할 수 있습니다.');
      navigate('/');
    }
  }, [currentUser, navigate]);

  return currentUser ? children : null;
}