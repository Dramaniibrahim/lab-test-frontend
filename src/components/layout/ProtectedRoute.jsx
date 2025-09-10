import { Outlet, Navigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuth';
import Sidebar from './Sidebar';
import Header from './Header';

export default function ProtectedRoute() {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

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