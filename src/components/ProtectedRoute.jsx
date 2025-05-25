import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? children : <Navigate to="/" replace />;
}