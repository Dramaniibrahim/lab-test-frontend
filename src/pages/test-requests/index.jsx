import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { TestRequestDrawer } from "../../components/layout/Drawers";
import axios from "../../services/api/axios";
import {
  TEST_REQUESTS_URL,
  TEST_REQUEST_BY_ID_URL,
} from "../../services/api/routes";
import { useAuth } from "../../context/AuthContext";
import { useTestRequestsData } from "../../services/api/route-data";

export default function TestRequestsList() {
  const { auth } = useAuth();
  const { testRequests: rawTestRequests, fetchData } = useTestRequestsData();

  // ✅ Normalize API response
  const testRequests = Array.isArray(rawTestRequests)
    ? rawTestRequests
    : rawTestRequests?.data?.testRequests && Array.isArray(rawTestRequests.data.testRequests)
    ? rawTestRequests.data.testRequests
    : [];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  const handleFormSubmit = async (formData) => {
    try {
      if (editingRequest) {
        // Update
        await axios.put(TEST_REQUEST_BY_ID_URL(editingRequest.id), formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
      } else {
        // Create
        await axios.post(TEST_REQUESTS_URL, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
      }

      fetchData();
      setIsDrawerOpen(false);
      setEditingRequest(null);
    } catch (err) {
      console.error("Error submitting test request:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this test request?")) return;

    try {
      await axios.delete(TEST_REQUEST_BY_ID_URL(id), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      fetchData();
    } catch (err) {
      console.error("Error deleting test request:", err);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 relative">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Test Requests Overview</h3>
          <button
            onClick={() => {
              setEditingRequest(null);
              setIsDrawerOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Test Request
          </button>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clinical Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testRequests.length > 0 ? (
              testRequests.map((request, index) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  {/* Auto numbering */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        request.priority === "CRITICAL"
                          ? "bg-red-100 text-red-800"
                          : request.priority === "STAT"
                          ? "bg-orange-100 text-orange-800"
                          : request.priority === "URGENT"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
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
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          setEditingRequest(request);
                          setIsDrawerOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(request.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No test requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TestRequestDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingRequest(null);
        }}
        onSubmit={handleFormSubmit}
        testRequestData={editingRequest}
      />
    </div>
  );
}
