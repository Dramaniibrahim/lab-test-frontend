import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { CreateSample } from '../../components/layout/Drawers';

export default function SamplesList() {
  const [selectedView, setSelectedView] = useState('Today');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const samples = [
    {
      id: 's1',
      testRequestId: 'tr1',
      barcode: 'ABC123456789',
      type: 'BLOOD',
      volume: 5.5,
      storageLocation: 'Lab Freezer A',
      expiresAt: '2025-10-01',
      notes: 'Handle with care',
    },
    {
      id: 's2',
      testRequestId: 'tr2',
      barcode: 'XYZ987654321',
      type: 'URINE',
      volume: 10.0,
      storageLocation: 'Lab Shelf B',
      expiresAt: '2025-09-15',
      notes: 'Urgent analysis',
    },
    {
      id: 's3',
      testRequestId: 'tr3',
      barcode: 'DEF456789123',
      type: 'SALIVA',
      volume: 2.0,
      storageLocation: 'Lab Cooler C',
      expiresAt: '2025-11-01',
      notes: 'Check for contamination',
    },
    {
      id: 's4',
      testRequestId: 'tr4',
      barcode: 'GHI789123456',
      type: 'TISSUE',
      volume: null,
      storageLocation: 'Lab Freezer D',
      expiresAt: null,
      notes: 'Biopsy sample',
    },
  ];

  const handleFormSubmit = (formData) => {
    console.log('Sample form submitted:', formData);
    setIsDrawerOpen(false);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 relative">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Samples Overview</h3>
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
              Create Sample
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Manage samples for laboratory testing.
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Request ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barcode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume (mL)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Storage Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiration Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {samples.map((sample) => (
              <tr key={sample.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sample.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sample.testRequestId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sample.barcode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sample.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sample.volume || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sample.storageLocation || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sample.expiresAt || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{sample.notes || '-'}</td>
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

      <CreateSample
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}