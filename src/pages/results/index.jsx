import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { CreateLabResult } from '../../components/layout/Drawers';

export default function ResultsList() {
  const [selectedView, setSelectedView] = useState('Today');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const labResults = [
    {
      id: 'lr1',
      sampleId: 's1',
      results: { value: 10, unit: 'mg/dL' },
      interpretation: 'Normal range',
      flags: ['Normal'],
      comments: 'No further action needed',
    },
    {
      id: 'lr2',
      sampleId: 's2',
      results: { value: 15, unit: 'mmol/L' },
      interpretation: 'Elevated levels detected',
      flags: ['High', 'Abnormal'],
      comments: 'Consult physician',
    },
    {
      id: 'lr3',
      sampleId: 's3',
      results: { value: 5, unit: 'g/L' },
      interpretation: 'Low levels detected',
      flags: ['Low'],
      comments: 'Repeat test recommended',
    },
    {
      id: 'lr4',
      sampleId: 's4',
      results: { value: 100, unit: 'IU/L' },
      interpretation: 'Critical result',
      flags: ['Critical'],
      comments: 'Immediate action required',
    },
  ];

  const handleFormSubmit = (formData) => {
    console.log('Lab result form submitted:', formData);
    setIsDrawerOpen(false);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 relative">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Lab Results Overview</h3>
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
              Create Lab Result
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Manage lab results for patient samples.
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sample ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Results</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interpretation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flags</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {labResults.map((result) => (
              <tr key={result.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.sampleId}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{JSON.stringify(result.results)}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{result.interpretation || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{result.flags.join(', ') || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{result.comments || '-'}</td>
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

      <CreateLabResult
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}