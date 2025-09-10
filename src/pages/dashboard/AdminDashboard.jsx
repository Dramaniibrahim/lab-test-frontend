import React, { useState } from 'react';
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
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // July 2026
  const [selectedView, setSelectedView] = useState('Today');

  // Sample chart data
  const chartData = [
    { time: '10am', onTime: 45, onLate: 35 },
    { time: '11am', onTime: 52, onLate: 30 },
    { time: '12pm', onTime: 42, onLate: 38 },
    { time: '01pm', onTime: 48, onLate: 32 },
    { time: '02pm', onTime: 45, onLate: 35 },
    { time: '03pm', onTime: 58, onLate: 28 },
    { time: '04pm', onTime: 55, onLate: 30 },
    { time: '05pm', onTime: 42, onLate: 35 },
    { time: '06pm', onTime: 38, onLate: 32 },
    { time: '07pm', onTime: 35, onLate: 30 }
  ];

  // Sample patient data
  const patients = [
    {
      id: '02',
      name: 'Nevaeh Simmons',
      room: 'Medial Room',
      age: 23,
      dob: '23 February 2003',
      status: 'Active',
      email: 'nevaeh@example.com',
      phone: '(316) 555-0116',
      avatar: '👨'
    },
    {
      id: '02',
      name: 'Nevaeh Simmons',
      room: 'Medial Room',
      age: 23,
      dob: '23 February 2003',
      status: 'Active',
      email: 'nevaeh@example.com',
      phone: '(316) 555-0116',
      avatar: '👩'
    },
    {
      id: '02',
      name: 'Nevaeh Simmons',
      room: 'Medial Room',
      age: 23,
      dob: '23 February 2003',
      status: 'Active',
      email: 'nevaeh@example.com',
      phone: '(316) 555-0116',
      avatar: '👨'
    },
    {
      id: '02',
      name: 'Nevaeh Simmons',
      room: 'Medial Room',
      age: 23,
      dob: '23 February 2003',
      status: 'Active',
      email: 'nevaeh@example.com',
      phone: '(316) 555-0116',
      avatar: '👩'
    }
  ];

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      days.push({
        date: date.getDate(),
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
        fullDate: date
      });
    }
    
    return days;
  };

  const StatCard = ({ icon, title, value, change, color = 'blue' }) => (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${color === 'blue' ? 'bg-blue-50' : color === 'green' ? 'bg-green-50' : color === 'purple' ? 'bg-purple-50' : 'bg-orange-50'}`}>
          {icon}
        </div>
        <MoreHorizontal className="w-4 h-4 text-gray-400" />
      </div>
      <div className="space-y-2">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          <span className="text-green-500 text-sm font-medium">+{change}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="flex">

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Users className="w-5 h-5 text-blue-600" />}
              title="Visitors"
              value="4,592"
              change="15.9%"
              color="blue"
            />
            <StatCard
              icon={<UserCheck className="w-5 h-5 text-green-600" />}
              title="Doctors"
              value="260"
              change="15.9%"
              color="green"
            />
            <StatCard
              icon={<User className="w-5 h-5 text-purple-600" />}
              title="Patient"
              value="540"
              change="15.9%"
              color="purple"
            />
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-orange-50">
                  <Bed className="w-5 h-5 text-orange-600" />
                </div>
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-gray-600 text-sm font-medium">Total Bed</h3>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-gray-900">1205</span>
                  <span className="text-gray-500 text-sm">Available</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-600">110 Bed</span>
                    <br />
                    <span className="text-xs text-gray-500">Private Bed</span>
                  </div>
                  <div>
                    <span className="text-gray-600">215 Bed</span>
                    <br />
                    <span className="text-xs text-gray-500">General Bed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Patient Overview Chart */}
            <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Patient Overview</h3>
              </div>
              
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">99 On Time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">10 On Late</span>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Line 
                      type="monotone" 
                      dataKey="onTime" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="onLate" 
                      stroke="#E5E7EB" 
                      strokeWidth={2}
                      dot={{ fill: '#E5E7EB', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer" />
                <span className="font-medium text-gray-900">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => (
                  <div
                    key={index}
                    className={`text-center py-2 text-sm cursor-pointer rounded ${
                      day.isCurrentMonth
                        ? day.isToday
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-900 hover:bg-gray-100'
                        : 'text-gray-300'
                    }`}
                  >
                    {day.date}
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs text-gray-600">Appointment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-xs text-gray-600">Meeting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-xs text-gray-600">Surgery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Overview Table */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Patient Overview</h3>
                <div className="flex space-x-2">
                  {['Today', 'Weekly', 'Monthly', 'Yearly'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedView(period)}
                      className={`px-3 py-1 text-sm rounded ${
                        selectedView === period
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Lorem ipsum dolor sit amet consectetur sit amet consectetur.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <span>{patient.avatar}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                            <div className="text-sm text-gray-500">{patient.room}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.dob}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          ● {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
