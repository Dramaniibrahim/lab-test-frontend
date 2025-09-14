import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuth';
import {
  Calendar,
  ChevronRight,
  Users,
  User,
  FileBarChart2,
  LogOut,
  FlaskConical,
  ClipboardList,
  Home,
} from 'lucide-react';

export default function Sidebar() {
  const { auth, logout } = useAuthContext();
  const { user } = auth;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (!user) return null;

  const role = user?.roles?.[0]; // assuming single role per user

  const hasAccess = (section) => {
    const accessMatrix = {
      dashboard: ['DOCTOR', 'NURSE', 'LAB_STAFF', 'SENIOR_LAB_STAFF', 'ADMIN'],
      patients: ['DOCTOR', 'NURSE', 'ADMIN'],
      testRequests: ['DOCTOR', 'LAB_STAFF', 'SENIOR_LAB_STAFF', 'ADMIN'],
      samples: ['LAB_STAFF', 'SENIOR_LAB_STAFF', 'ADMIN'],
      results: ['LAB_STAFF', 'SENIOR_LAB_STAFF', 'ADMIN'],
      schedules: ['DOCTOR', 'NURSE', 'LAB_STAFF', 'SENIOR_LAB_STAFF', 'ADMIN'],
      reports: ['SENIOR_LAB_STAFF', 'ADMIN'],
    };

    return accessMatrix[section]?.includes(role);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">

        {/* Main Navigation */}
        <div className="space-y-1">
          {hasAccess('dashboard') && (
            <Link
              to="/"
              className="flex items-center space-x-3 px-3 py-2 text-gray-900 bg-gray-50 rounded-lg"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          )}

          {hasAccess('patients') && (
            <Link
              to="/patients"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <User className="w-4 h-4" />
              <span>Patients</span>
            </Link>
          )}
        </div>

        {/* Applications Section */}
        <div className="mt-6">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Applications
          </div>

          <div className="space-y-1 mt-2">
            {hasAccess('schedules') && (
              <Link
                to="/schedules"
                className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4" />
                  <span>Schedules</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}

            {hasAccess('results') && (
              <Link
                to="/results"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Results</span>
              </Link>
            )}

            {hasAccess('samples') && (
              <Link
                to="/samples"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <FlaskConical className="w-4 h-4" />
                <span>Samples</span>
              </Link>
            )}

            {hasAccess('testRequests') && (
              <Link
                to="/test-requests"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Test Requests</span>
              </Link>
            )}
          </div>
        </div>

        {/* Others Section */}
        <div className="mt-6">
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            Others
          </div>

          <div className="space-y-1 mt-2">
            {hasAccess('reports') && (
              <Link
                to="/reports"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <FileBarChart2 className="w-4 h-4" />
                <span>Reports</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
