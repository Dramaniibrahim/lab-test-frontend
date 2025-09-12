import React, { useState } from "react";
import axios from "../../services/api/axios";
import { useNavigate } from "react-router-dom";
import {
  PATIENTS_URL,
  TEST_REQUESTS_URL,
  SAMPLES_URL,
  LAB_RESULTS_URL,
} from "../../services/api/routes";
import { useAuth } from "../../context/AuthContext";



// ---------------- DRAWER WRAPPER ----------------
const DrawerWrapper = ({ title, children, onClose, isOpen }) => {
  if (!isOpen) return null; // ⬅️ prevents always rendering

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
      <div
        className="fixed inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      ></div>
    </div>
  );
};

// ---------------- CREATE PATIENT ----------------
export const CreatePatient = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    age: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(PATIENTS_URL, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      onSubmit?.(formData);
      navigate("/patients");
      onClose();
    } catch (err) {
      console.error("Error creating patient:", err);
      alert("Failed to create patient");
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
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="w-full border rounded p-2"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Contact"
          value={formData.contact}
          onChange={(e) =>
            setFormData({ ...formData, contact: e.target.value })
          }
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
  const [formData, setFormData] = useState({
    patientId: "",
    testType: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(TEST_REQUESTS_URL, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
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
          onChange={(e) =>
            setFormData({ ...formData, patientId: e.target.value })
          }
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Test Type"
          value={formData.testType}
          onChange={(e) =>
            setFormData({ ...formData, testType: e.target.value })
          }
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
  const [formData, setFormData] = useState({
    testRequestId: "",
    sampleType: "",
    collectedBy: "",
  });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(SAMPLES_URL, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
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
          onChange={(e) =>
            setFormData({ ...formData, testRequestId: e.target.value })
          }
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Sample Type"
          value={formData.sampleType}
          onChange={(e) =>
            setFormData({ ...formData, sampleType: e.target.value })
          }
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Collected By"
          value={formData.collectedBy}
          onChange={(e) =>
            setFormData({ ...formData, collectedBy: e.target.value })
          }
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
  const [formData, setFormData] = useState({
    sampleId: "",
    result: "",
    remarks: "",
  });
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(LAB_RESULTS_URL, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
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
          onChange={(e) =>
            setFormData({ ...formData, sampleId: e.target.value })
          }
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
          onChange={(e) =>
            setFormData({ ...formData, remarks: e.target.value })
          }
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
