import React, { useState,useEffect } from "react";
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-xl overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

// ---------------- CREATE PATIENT ----------------
export const CreatePatient = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "MALE",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    medicalRecordNumber: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(PATIENTS_URL, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });
      onSubmit?.(form);
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="w-full border rounded p-2" />
        <input type="date" name="dob" value={form.dob} onChange={handleChange} placeholder="Date of Birth" required className="w-full border rounded p-2" />
        <select name="gender" value={form.gender} onChange={handleChange} className="w-full border rounded p-2" required>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
          <option value="UNKNOWN">Unknown</option>
        </select>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required className="w-full border rounded p-2" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full border rounded p-2" />
        <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full border rounded p-2" />
        <input type="text" name="emergencyContact" value={form.emergencyContact} onChange={handleChange} placeholder="Emergency Contact" className="w-full border rounded p-2" />
        <input type="text" name="medicalRecordNumber" value={form.medicalRecordNumber} onChange={handleChange} placeholder="Medical Record Number" className="w-full border rounded p-2" />
        <div className="flex items-center space-x-2 mt-2">
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="w-4 h-4" />
          <label className="text-sm font-medium text-gray-700">Active</label>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{loading ? "Saving..." : "Save Patient"}</button>
        </div>
      </form>
    </DrawerWrapper>
  );
};

// ---------------- CREATE TEST REQUEST ----------------
export const CreateTestRequest = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({ patientId: "", testType: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(TEST_REQUESTS_URL, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });
      onSubmit?.(form);
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" name="patientId" value={form.patientId} onChange={handleChange} placeholder="Patient ID" required className="w-full border rounded p-2" />
        <input type="text" name="testType" value={form.testType} onChange={handleChange} placeholder="Test Type" required className="w-full border rounded p-2" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="w-full border rounded p-2" />
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">{loading ? "Saving..." : "Save Request"}</button>
        </div>
      </form>
    </DrawerWrapper>
  );
};

// ---------------- CREATE SAMPLE ----------------
export const CreateSample = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({ testRequestId: "", sampleType: "", collectedBy: "" });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(SAMPLES_URL, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });
      onSubmit?.(form);
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" name="testRequestId" value={form.testRequestId} onChange={handleChange} placeholder="Test Request ID" required className="w-full border rounded p-2" />
        <input type="text" name="sampleType" value={form.sampleType} onChange={handleChange} placeholder="Sample Type" required className="w-full border rounded p-2" />
        <input type="text" name="collectedBy" value={form.collectedBy} onChange={handleChange} placeholder="Collected By" className="w-full border rounded p-2" />
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">{loading ? "Saving..." : "Save Sample"}</button>
        </div>
      </form>
    </DrawerWrapper>
  );
};

// ---------------- CREATE LAB RESULT ----------------
export const CreateLabResult = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({ sampleId: "", result: "", remarks: "" });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(LAB_RESULTS_URL, form, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
        withCredentials: true,
      });
      onSubmit?.(form);
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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" name="sampleId" value={form.sampleId} onChange={handleChange} placeholder="Sample ID" required className="w-full border rounded p-2" />
        <textarea name="result" value={form.result} onChange={handleChange} placeholder="Result" required className="w-full border rounded p-2" />
        <textarea name="remarks" value={form.remarks} onChange={handleChange} placeholder="Remarks" className="w-full border rounded p-2" />
        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">{loading ? "Saving..." : "Save Result"}</button>
        </div>
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
      <div className="fixed inset-0" onClick={onClose}></div>

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

