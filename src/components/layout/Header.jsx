import { useNotifications } from '../../context/NotificationContext';
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

export default function Header() {
  const { notifications } = useNotifications();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">LIMS</span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-none outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Sun className="w-5 h-5 text-gray-600" />
            <div className="w-10 h-5 bg-gray-200 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5"></div>
            </div>
            <Moon className="w-5 h-5 text-gray-400" />
            <Bell className="w-5 h-5 text-gray-600" />
            <Mail className="w-5 h-5 text-gray-600" />
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Patricia Peters</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">P</span>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <Settings className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>
    
  );
}


      