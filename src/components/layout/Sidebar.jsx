import { Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../../hooks/useAuth';
import { canAccessPatients, canCreateTestRequests, canProcessSamples, canEnterResults, canValidateResults, canViewReports } from '../../utils/roles';
import { 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Mail, 
  Settings, 
  Users, 
  UserCheck, 
  User, 
  Bed, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react';

export default function Sidebar() {
  const { auth, logout } = useAuthContext();
  const { user } = auth;
  console.log("Sidebar context:", user);
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

  return (
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-3 px-3 py-2 text-gray-900 bg-gray-50 rounded-lg">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <li><Link to="/">Dashboard</Link></li>
              </div>
              
              <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                <User className="w-4 h-4" />
                { <li><Link to="/patients">Patients</Link></li>}
              </div>
            </div>

            <div className="mt-6">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Applications
              </div>
              <div className="space-y-1 mt-2">

                <div className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4" />
                    {<li><Link to="/schedules">Schedules</Link></li>}
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>

                {/*<div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span>Appointment</span>
                </div>*/}

                <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Users className="w-4 h-4" />
                  {<li><Link to="/results">Results</Link></li>}
                </div>

                <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Users className="w-4 h-4" />
                  {<li><Link to="/samples">Samples</Link></li>}
                </div>

                <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  {<li><Link to="/test-requests">Test Requests</Link></li>}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Others
              </div>
              <div className="space-y-1 mt-2">
                <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Users className="w-4 h-4" />
                  {<li><Link to="/reports">Report</Link></li>}
                </div>
                {/*<div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span>Payment</span>
                </div>
                <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Mail className="w-4 h-4" />
                  <span>Mail</span>
                </div>
                <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span>Widgets</span> 
                </div> */}
                <div className="flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                  onClick={handleLogout}
                >
                  <div className="w-4 h-4 bg-red-400 rounded"></div>
                  <span>Log Out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}