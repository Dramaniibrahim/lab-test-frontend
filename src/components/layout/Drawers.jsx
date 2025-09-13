import React, { useState, useEffect } from "react";
import axios from "../../services/api/axios";
import { useNavigate } from "react-router-dom";
import {
  PATIENTS_URL,
  TEST_REQUESTS_URL,
  SAMPLES_URL,
  LAB_RESULTS_URL,
} from "../../services/api/routes";
import { useAuth } from "../../context/AuthContext";
import { X } from "lucide-react";

// ---------------- DRAWER WRAPPER ----------------
const DrawerWrapper = ({ title, children, onClose, isOpen }) => {
  if (!isOpen) return null; // <-- only render when open

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div className="w-full max-w-lg bg-white h-full shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
};

// ---------------- CREATE PATIENT ----------------
export const CreatePatient = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "MALE",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
  });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send the exact structure backend expects
      await axios.post(PATIENTS_URL, formData, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });
      onSubmit?.(formData);
      navigate("/patients");
      onClose();
    } catch (err) {
      console.error("Error creating patient:", err.response?.data || err);
      alert(err.response?.data?.error?.message || "Failed to create patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerWrapper title="Create Patient" onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="date"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value.toUpperCase() })}
          className="w-full border rounded p-2"
          required
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="Emergency Contact"
          value={formData.emergencyContact}
          onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded p-2"
        >
          {loading ? "Saving..." : "Save Patient"}
        </button>
      </form>
    </DrawerWrapper>
  );
};

// ---------------- CREATE TEST REQUEST ----------------
export const CreateTestRequest = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ patientId: "", testType: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(TEST_REQUESTS_URL, formData, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });
      onSubmit?.(formData);
      onClose();
    } catch (err) {
      console.error("Error creating test request:", err);
      alert("Failed to create test request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerWrapper title="Create Test Request" onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Patient ID"
          value={formData.patientId}
          onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Test Type"
          value={formData.testType}
          onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <textarea
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white rounded p-2"
        >
          {loading ? "Saving..." : "Save Request"}
        </button>
      </form>
    </DrawerWrapper>
  );
};

// ---------------- CREATE SAMPLE ----------------
export const CreateSample = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ testRequestId: "", sampleType: "", collectedBy: "" });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(SAMPLES_URL, formData, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });
      onSubmit?.(formData);
      onClose();
    } catch (err) {
      console.error("Error creating sample:", err);
      alert("Failed to create sample");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerWrapper title="Create Sample" onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Test Request ID"
          value={formData.testRequestId}
          onChange={(e) => setFormData({ ...formData, testRequestId: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Sample Type"
          value={formData.sampleType}
          onChange={(e) => setFormData({ ...formData, sampleType: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Collected By"
          value={formData.collectedBy}
          onChange={(e) => setFormData({ ...formData, collectedBy: e.target.value })}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white rounded p-2"
        >
          {loading ? "Saving..." : "Save Sample"}
        </button>
      </form>
    </DrawerWrapper>
  );
};

// ---------------- CREATE LAB RESULT ----------------
export const CreateLabResult = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ sampleId: "", result: "", remarks: "" });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(LAB_RESULTS_URL, formData, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });
      onSubmit?.(formData);
      onClose();
    } catch (err) {
      console.error("Error creating lab result:", err);
      alert("Failed to create lab result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerWrapper title="Create Lab Result" onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Sample ID"
          value={formData.sampleId}
          onChange={(e) => setFormData({ ...formData, sampleId: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <textarea
          placeholder="Result"
          value={formData.result}
          onChange={(e) => setFormData({ ...formData, result: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <textarea
          placeholder="Remarks"
          value={formData.remarks}
          onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white rounded p-2"
        >
          {loading ? "Saving..." : "Save Result"}
        </button>
      </form>
    </DrawerWrapper>
  );
};


//---------------- Edit Drawers -------------------------

//---------------- Patients -----------------------------


export function EditPatientDrawer({ isOpen, onClose, onSubmit, patientData }) {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "UNKNOWN",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    medicalRecordNumber: "",
    isActive: true, // default active
  });

  useEffect(() => {
    if (patientData) {
      setForm({
        name: patientData.name || "",
        dob: patientData.dob ? patientData.dob.split("T")[0] : "",
        gender: patientData.gender || "UNKNOWN",
        phone: patientData.phone || "",
        email: patientData.email || "",
        address: patientData.address || "",
        emergencyContact: patientData.emergencyContact || "",
        medicalRecordNumber: patientData.medicalRecordNumber || "",
        isActive: patientData.isActive ?? true, // default true if undefined
      });
    }
  }, [patientData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // Pass all form data including isActive
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Edit Patient</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          {/* Existing fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
              <option value="UNKNOWN">Unknown</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
            <input
              type="text"
              name="emergencyContact"
              value={form.emergencyContact}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Medical Record Number</label>
            <input
              type="text"
              name="medicalRecordNumber"
              value={form.medicalRecordNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* isActive toggle */}
          <div className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium text-gray-700">Active</label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

