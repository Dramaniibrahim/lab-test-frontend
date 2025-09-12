import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';


export default function ProtectedRoute({ children }) {
  const { auth } = useAuth();
  console.log('ProtectedRoute: auth state:', auth);
  if (!auth.token || !auth.user) {
    console.log('No token or user, redirecting to /login');
    return <Navigate to="/login" replace />;
  }
  console.log('Access granted, rendering children');

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}