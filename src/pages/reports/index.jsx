import { useEffect, useState } from 'react';
import { getReports } from '../../api/reports';
import useAuthContext from '../../hooks/useAuth';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChevronDown, MoreHorizontal, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Reports() {
  const [selectedDate, setSelectedDate] = useState('November 2024');
  const [activeTab, setActiveTab] = useState('Week');

  // Sample data for the chart
  const chartData = [
    { name: 'Mon', patients: 35, completedTests: 28 },
    { name: 'Tue', patients: 42, completedTests: 38 },
    { name: 'Wed', patients: 38, completedTests: 35 },
    { name: 'Thu', patients: 55, completedTests: 48 },
    { name: 'Fri', patients: 48, completedTests: 42 },
    { name: 'Sat', patients: 25, completedTests: 20 },
    { name: 'Sun', patients: 18, completedTests: 15 }
  ];

  const performanceCards = [
    {
      title: 'All Appointments',
      value: '422',
      bgColor: 'bg-red-100',
      iconBg: 'bg-red-200',
      icon: '📅',
      trend: 'up'
    },
    {
      title: 'Total Patients',
      value: '222',
      bgColor: 'bg-yellow-100',
      iconBg: 'bg-yellow-200',
      icon: '👥',
      trend: 'up'
    },
    {
      title: 'Total Services',
      value: '149',
      bgColor: 'bg-green-100',
      iconBg: 'bg-green-200',
      icon: '✓',
      trend: 'up'
    },
    {
      title: 'Total Earning',
      value: '$122',
      bgColor: 'bg-blue-100',
      iconBg: 'bg-blue-200',
      icon: '💰',
      trend: 'up'
    }
  ];

  const appointments = [
    {
      time: '6:00 - 6:30',
      title: 'Make the logo bigger',
      color: 'bg-yellow-200'
    },
    {
      time: '6:00 - 6:30',
      title: 'Make the logo bigger',
      color: 'bg-green-200'
    },
    {
      time: '6:00 - 6:30',
      title: 'Kick-off meeting with project team',
      color: 'bg-blue-200'
    },
    {
      time: '6:00 - 6:30',
      title: 'Kick-off meeting with project team',
      color: 'bg-gray-200'
    },
    {
      time: '6:20 - 7:00',
      title: 'Prepare deliverables',
      color: 'bg-red-200'
    }
  ];

  return (
    <div className="min-h-screen bg-white-50 p-6">

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Performance</h3>
        </div>

        {/* Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {performanceCards.map((card, index) => (
            <div key={index} className={`${card.bgColor} p-6 rounded-lg relative overflow-hidden`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.iconBg} w-10 h-10 rounded-lg flex items-center justify-center text-lg`}>
                  {card.icon}
                </div>
                <button className="text-gray-600 hover:text-gray-800">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{card.value}</div>
              <div className="text-sm text-gray-600">{card.title}</div>
              {/* Mini trend line */}
              <div className="absolute bottom-2 right-2 opacity-30">
                <svg width="60" height="20" viewBox="0 0 60 20">
                  <path d="M0,15 Q15,10 30,12 T60,5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Patients and Tests Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">Patients & Completed Tests</h4>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Patients</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Completed Tests</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="patients" fill="#3b82f6" name="Patients" />
              <Bar dataKey="completedTests" fill="#10b981" name="Completed Tests" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              📅 {selectedDate} <ChevronDown className="w-4 h-4" />
            </button>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveTab('Day')}
                className={`px-4 py-2 text-sm ${activeTab === 'Day' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                Day
              </button>
              <button
                onClick={() => setActiveTab('Week')}
                className={`px-4 py-2 text-sm ${activeTab === 'Week' ? 'bg-red-400 text-white' : 'hover:bg-gray-50'}`}
              >
                Week
              </button>
              <button
                onClick={() => setActiveTab('Month')}
                className={`px-4 py-2 text-sm ${activeTab === 'Month' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                Month
              </button>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-4">
            {[
              { day: '1', label: 'Mon' },
              { day: '2', label: 'Tue' },
              { day: '3', label: 'Wed' },
              { day: '4', label: 'Thu', active: true },
              { day: '5', label: 'Fri' }
            ].map((date, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                  date.active 
                    ? 'bg-red-400 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}>
                  {date.day}
                </div>
                <div className="text-xs text-gray-500 mt-1">{date.label}</div>
              </div>
            ))}
          </div>
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Time Schedule */}
        <div className="space-y-4">
          {['6 am', '7 am', '8 am', '9 am'].map((time, timeIndex) => (
            <div key={timeIndex} className="flex items-start gap-4">
              <div className="w-12 text-sm text-gray-500 font-medium">{time}</div>
              <div className="flex-1 grid grid-cols-5 gap-2">
                {appointments
                  .filter((_, index) => index >= timeIndex && index < timeIndex + 2)
                  .map((appointment, index) => (
                    <div
                      key={index}
                      className={`${appointment.color} p-3 rounded-lg text-xs`}
                      style={{ gridColumn: `${(index % 5) + 1}` }}
                    >
                      <div className="font-medium text-gray-800">{appointment.title}</div>
                      <div className="text-gray-600 mt-1">{appointment.time}</div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}