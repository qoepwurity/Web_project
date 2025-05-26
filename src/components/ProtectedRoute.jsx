import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuthStore();
  return currentUser ? children : <Navigate to="/" replace />;
}
