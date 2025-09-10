import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Mic, Upload, FileText, Users, Edit, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(2021, 8, 24)); // Sept 24, 2021
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [location, setLocation] = useState('Main drive road, New York, USA');

  const scheduleData = {
    'Sep 21': [
      { time: '10 am', title: 'Site Visit with...', type: 'visit', color: 'bg-blue-100 text-blue-800' }
    ],
    'Sep 22': [
      { time: '11 am', title: 'Review reports', type: 'review', color: 'bg-red-100 text-red-800' },
      { time: '12 pm', title: 'Property site...', type: 'property', color: 'bg-green-100 text-green-800' },
      { time: '1 pm', title: 'Upload propert...', type: 'upload', color: 'bg-gray-100 text-gray-800' },
      { time: '2 pm', title: 'Meeting', type: 'meeting', color: 'bg-yellow-100 text-yellow-800' },
      { time: '4 pm', title: 'Review pending...', type: 'review', color: 'bg-purple-100 text-purple-800' },
      { time: '5 pm', title: 'Submit proper...', type: 'submit', color: 'bg-blue-100 text-blue-800' }
    ],
    'Sep 23': [
      { time: '11 am', title: 'Review reports', type: 'review', color: 'bg-red-100 text-red-800' },
      { time: '12 pm', title: 'Property site...', type: 'property', color: 'bg-green-100 text-green-800' },
      { time: '2 pm', title: 'Submit a new property listing', type: 'submit', color: 'bg-blue-100 text-blue-800' },
      { time: '3 pm', title: 'Attend lakhs...', type: 'attend', color: 'bg-orange-100 text-orange-800' },
      { time: '6 pm', title: 'Re-schedule me...', type: 'reschedule', color: 'bg-gray-100 text-gray-800' }
    ],
    'Sep 24': [],
    'Sep 25': [],
    'Sep 26': [],
    'Sep 27': []
  };

  const days = ['Sep 21', 'Sep 22', 'Sep 23', 'Sep 24', 'Sep 25', 'Sep 26', 'Sep 27'];
  const currentWeek = 'Sep 21 - Sep 27, 2021';

  const getEventIcon = (type) => {
    switch (type) {
      case 'meeting': return <Mic className="w-4 h-4" />;
      case 'upload': return <Upload className="w-4 h-4" />;
      case 'submit': return <FileText className="w-4 h-4" />;
      case 'attend': return <Users className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">My Schedules</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-lg p-1">
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Day</button>
              <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded">Week</button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Month</button>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-200 rounded">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-medium text-gray-700">{currentWeek}</span>
              <button className="p-2 hover:bg-gray-200 rounded">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-6">
          {/* Time Column */}
          <div className="col-span-1">
            <div className="h-12"></div>
            {Array.from({ length: 9 }, (_, i) => i + 10).map(hour => (
              <div key={hour} className="h-20 border-b border-gray-200 flex items-start pt-2">
                <span className="text-sm text-gray-500">{hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'pm' : 'am'}</span>
              </div>
            ))}
          </div>

          {/* Schedule Grid */}
          {days.map((day, dayIndex) => (
            <div key={day} className="col-span-1">
              <div className="h-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{day}</div>
                  <div className="text-xs text-gray-500">{21 + dayIndex}</div>
                </div>
              </div>
              
              <div className="relative">
                {Array.from({ length: 9 }, (_, i) => i + 10).map(hour => (
                  <div key={hour} className="h-20 border-b border-gray-200 border-r border-gray-100 relative">
                    {scheduleData[day]?.filter(event => {
                      const eventHour = parseInt(event.time.split(' ')[0]);
                      const isPM = event.time.includes('pm');
                      const eventHour24 = isPM && eventHour !== 12 ? eventHour + 12 : (!isPM && eventHour === 12 ? 0 : eventHour);
                      return eventHour24 === hour;
                    }).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`absolute left-1 right-1 top-2 p-2 rounded text-xs font-medium ${event.color} flex items-center space-x-1`}
                      >
                        {getEventIcon(event.type)}
                        <span className="truncate">{event.title}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Create Schedule Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Create Schedule Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Create a new schedule</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="Enter a title or use voice command"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="absolute right-3 top-2.5">
                        <Mic className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">September 24th, Monday</span>
                      <div className="flex ml-auto space-x-1">
                        <button><ChevronLeft className="w-4 h-4" /></button>
                        <button><ChevronRight className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Choose a time</span>
                      <span className="ml-auto text-xs text-orange-500 font-medium">GMT +8</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Attachment</label>
                    <div className="flex space-x-2">
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-300 rounded"></div>
                      </div>
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-300 rounded"></div>
                      </div>
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-300 rounded"></div>
                      </div>
                      <button className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center hover:border-gray-400">
                        <Plus className="w-6 h-6 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;