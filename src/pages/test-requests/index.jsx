import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { TestRequestDrawer } from '../../components/layout/Drawers';

export default function TestRequestsList() {
  const [selectedView, setSelectedView] = useState('Today');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const testRequests = [
    {
      id: 'tr1',
      patientId: 'p1',
      testTypeId: 'tt1',
      priority: 'ROUTINE',
      clinicalInfo: 'Patient presents with fatigue',
      instructions: 'Fasting required',
      notes: 'Check for anemia',
    },
    {
      id: 'tr2',
      patientId: 'p2',
      testTypeId: 'tt2',
      priority: 'URGENT',
      clinicalInfo: 'Suspected infection',
      instructions: 'Collect sample ASAP',
      notes: 'Monitor closely',
    },
    {
      id: 'tr3',
      patientId: 'p3',
      testTypeId: 'tt3',
      priority: 'STAT',
      clinicalInfo: 'Chest pain reported',
      instructions: 'Immediate processing',
      notes: 'Cardiac panel',
    },
    {
      id: 'tr4',
      patientId: 'p4',
      testTypeId: 'tt4',
      priority: 'CRITICAL',
      clinicalInfo: 'Critical condition',
      instructions: 'Handle with care',
      notes: 'Urgent results needed',
    },
  ];

  const handleFormSubmit = (formData) => {
    console.log('Test request form submitted:', formData);
    setIsDrawerOpen(false);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 relative">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Test Requests Overview</h3>
          <div className="flex items-center space-x-4">
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
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Test Request
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Manage test requests for laboratory processing.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Type ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clinical Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.patientId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.testTypeId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      request.priority === 'CRITICAL'
                        ? 'bg-red-100 text-red-800'
                        : request.priority === 'STAT'
                        ? 'bg-orange-100 text-orange-800'
                        : request.priority === 'URGENT'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    ● {request.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{request.clinicalInfo}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{request.instructions}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{request.notes}</td>
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

      <TestRequestDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}