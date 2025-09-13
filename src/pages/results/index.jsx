import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { LabResultDrawer } from "../../components/layout/Drawers";
import { useLabResultsData } from "../../api/data";
import axios from "../../api/axios";
import {
  LAB_RESULTS_URL,
  LAB_RESULT_BY_ID_URL,
} from "../../api/routes";
import { useAuth } from "../../context/AuthContext";

export default function ResultsList() {
  const { auth } = useAuth();
  const { labResults, fetchData } = useLabResultsData();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingResult, setEditingResult] = useState(null);

  // Handle create/update form submission
  const handleFormSubmit = async (formData) => {
    try {
      if (editingResult) {
        // Update existing lab result
        await axios.put(LAB_RESULT_BY_ID_URL(editingResult.id), formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
      } else {
        // Create new lab result
        await axios.post(LAB_RESULTS_URL, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
      }
      fetchData();
      setIsDrawerOpen(false);
      setEditingResult(null);
    } catch (err) {
      console.error("Error saving lab result:", err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lab result?")) return;
    try {
      await axios.delete(LAB_RESULT_BY_ID_URL(id), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      fetchData();
    } catch (err) {
      console.error("Error deleting lab result:", err);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 relative">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Lab Results Overview</h3>
          <button
            onClick={() => {
              setEditingResult(null);
              setIsDrawerOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Lab Result
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Manage lab results for patient samples.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sample ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Results</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interpretation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flags</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comments</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {labResults.length > 0 ? (
              labResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{result.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{result.sampleId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {result.results ? JSON.stringify(result.results) : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{result.interpretation || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {result.flags?.join(", ") || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{result.comments || "-"}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setEditingResult(result);
                          setIsDrawerOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(result.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  No lab results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      <LabResultDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingResult(null);
        }}
        onSubmit={handleFormSubmit}
        resultData={editingResult} // pre-fill when editing
      />
    </div>
  );
}
