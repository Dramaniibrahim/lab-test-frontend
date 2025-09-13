import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { CreatePatient } from "../../components/layout/Drawers";
import { usePatientsData } from "../../services/api/route-data";

export default function PatientsList() {
  const [selectedView, setSelectedView] = useState("Today");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [patientsList, setPatientsList] = useState([]);

  // Fetch patients from hook
  const { patients: rawPatients = [], fetchData = () => {} } = usePatientsData() || [];

  // Normalize API response
  const patients = Array.isArray(rawPatients)
    ? rawPatients
    : rawPatients?.data && Array.isArray(rawPatients.data)
    ? rawPatients.data
    : [];

  // Initialize local state with API data
  useEffect(() => {
    setPatientsList(patients);
  }, [patients]);

  const handleFormSubmit = (formData) => {
    console.log("Patient form submitted:", formData);

    // Add new patient to local list
    setPatientsList((prev) => [...prev, formData]);

    // Optionally refetch from API if needed
    fetchData();

    // Close drawer
    setIsDrawerOpen(false);
  };

  const getAvatar = (gender) => {
    if (!gender) return "👤";
    return gender.toLowerCase() === "female" ? "👩" : "👨";
  };

  const computeAge = (dob) => {
    if (!dob) return "—";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };


  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 relative">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Patient Overview</h3>
          <div className="flex items-center space-x-4">
            {/* Period filter buttons */}
            <div className="flex space-x-2">
              {["Today", "Weekly", "Monthly", "Yearly"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedView(period)}
                  className={`px-3 py-1 text-sm rounded ${
                    selectedView === period
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
            {/* Create button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Patient
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Manage patient records for the laboratory system.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {patientsList.length > 0 ? (
            patientsList.map((patient, index) => (
              <tr key={patient.id || patient.email || index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.id || index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <span>{getAvatar(patient.gender)}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      <div className="text-sm text-gray-500">{patient.medicalRecordNumber || "—"}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{computeAge(patient.dob)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDob(patient.dob)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      patient.isActive === true
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    ● {patient.status || "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.email || "—"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.phone || "—"}</td>
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
            ))
          ) : (
            <tr>
              <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>

        </table>
      </div>

      {/* Drawer */}
      <CreatePatient
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
