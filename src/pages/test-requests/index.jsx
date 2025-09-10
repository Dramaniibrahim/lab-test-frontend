import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PatientsTable from '../../components/tables/PatientsTable';
import { getPatients, deletePatient } from '../../api/patients';
import useAuthContext from '../../hooks/useAuth';

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

export default function TestRequestsList() {
  const { user } = useAuthContext();
      const [selectedView, setSelectedView] = useState('Today');
    
  
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
  
    return (
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
    );
  }