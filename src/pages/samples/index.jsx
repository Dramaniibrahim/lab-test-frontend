import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { SampleDrawer } from "../../components/layout/Drawers";
import { useSamplesData } from "../../services/api/route-data";
import axios from "../../services/api/axios";
import { SAMPLES_URL, SAMPLE_BY_ID_URL } from "../../services/api/routes";
import { useAuth } from "../../context/AuthContext";

export default function SamplesList() {
  const { auth } = useAuth();

  // 🔍 Hook data
  const { samples: rawSamples = [], fetchData = () => {} } = useSamplesData() || [];

  // Debug logs
  console.log("🔥 Raw samples from hook:", rawSamples);

  // Normalize API response
  const samples = Array.isArray(rawSamples)
    ? rawSamples
    : rawSamples?.data && Array.isArray(rawSamples.data)
    ? rawSamples.data
    : [];

  console.log("✅ Normalized samples array:", samples);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingSample, setEditingSample] = useState(null);

  // Handle create/update form submission
  const handleFormSubmit = async (formData) => {
    console.log("📤 Submitting form data:", formData);

    try {
      if (editingSample) {
        console.log("✏️ Updating sample with ID:", editingSample.id);
        await axios.put(SAMPLE_BY_ID_URL(editingSample.id), formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
      } else {
        console.log("➕ Creating new sample");
        await axios.post(SAMPLES_URL, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
      }

      console.log("🔄 Refetching samples after save...");
      fetchData();
      setIsDrawerOpen(false);
      setEditingSample(null);
    } catch (err) {
      console.error("❌ Error saving sample:", err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sample?")) return;

    try {
      console.log("🗑️ Deleting sample with ID:", id);
      await axios.delete(SAMPLE_BY_ID_URL(id), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      console.log("🔄 Refetching samples after delete...");
      fetchData();
    } catch (err) {
      console.error("❌ Error deleting sample:", err);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 relative">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Samples Overview</h3>
          <button
            onClick={() => {
              setEditingSample(null);
              setIsDrawerOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Sample
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Manage collected samples linked to test requests.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test Request ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Barcode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {samples.length > 0 ? (
              samples.map((sample) => (
                <tr key={sample.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{sample.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{sample.testRequestId || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{sample.barcode || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{sample.type || "-"}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => {
                          console.log("✏️ Editing sample:", sample);
                          setEditingSample(sample);
                          setIsDrawerOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDelete(sample.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No samples found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      <SampleDrawer
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setEditingSample(null);
        }}
        onSubmit={handleFormSubmit}
        sampleData={editingSample} // pre-fill if editing
      />
    </div>
  );
}
