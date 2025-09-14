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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="relative w-full max-w-lg bg-white h-full shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

// ---------------- PATIENT DRAWER (Create/Edit) ----------------
export const PatientDrawer = ({ isOpen, onClose, patientData, onSubmit }) => {
  const isEditMode = !!patientData;
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

  useEffect(() =>{
      if (patientData) {
        // Edit mode
        setForm({
          name: patientData.name || "",
          dob: patientData.dob ? patientData.dob.split("T")[0] : "",
          gender: patientData.gender || "UNKNOWN",
          phone: patientData.phone || "",
          email: patientData.email || "",
          address: patientData.address || "",
          emergencyContact: patientData.emergencyContact || "",
          medicalRecordNumber: patientData.medicalRecordNumber || "",
          isActive: patientData.isActive ?? true,
        });
      } else {
        // Create mode → reset form
        setForm({
          name: "",
          dob: "",
          gender: "UNKNOWN",
          phone: "",
          email: "",
          address: "",
          emergencyContact: "",
          medicalRecordNumber: "",
          isActive: true,
        });
      }
    }, [patientData, isOpen]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await axios.put(`${PATIENTS_URL}/${patientData.id}`, form, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
        });
      } else {
        await axios.post(PATIENTS_URL, form, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
        });
      }
      onSubmit?.(form);
      if (!isEditMode) navigate("/patients");
      onClose();
    } catch (err) {
      console.error("Error saving patient:", err.response?.data || err);
      alert(err.response?.data?.error?.message || "Failed to save patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerWrapper title={isEditMode ? "Edit Patient" : "Create Patient"} onClose={onClose} isOpen={isOpen}>
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
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            {loading ? "Saving..." : isEditMode ? "Save Changes" : "Save Patient"}
          </button>
        </div>
      </form>
    </DrawerWrapper>
  );
};

// ---------------- TEST REQUEST DRAWER ----------------
// ---------------- TEST REQUEST DRAWER ----------------
export const TestRequestDrawer = ({ isOpen, onClose, testRequestData, onSubmit }) => {
  const isEditMode = !!testRequestData;
  const [form, setForm] = useState({
    patientId: "",
    testTypeId: "",
    priority: "ROUTINE",
    clinicalInfo: "",
    instructions: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);
  const [testTypes, setTestTypes] = useState([]);
  const { auth } = useAuth();

  // Fetch patients for dropdown
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(PATIENTS_URL, {
          headers: { Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
        });
        setPatients(res.data?.data?.patients || []);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    if (auth?.token) fetchPatients();
  }, [auth]);

  // Fetch active test types for dropdown
  useEffect(() => {
    const fetchTestTypes = async () => {
      try {
        const res = await axios.get("/test-types/active", {
          headers: { Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
        });
        setTestTypes(res.data?.data?.testTypes || []);
      } catch (err) {
        console.error("Error fetching test types:", err);
      }
    };
    if (auth?.token) fetchTestTypes();
  }, [auth]);

  // Populate form when editing / reset when creating
  useEffect(() => {
    if (testRequestData) {
      setForm({
        patientId: testRequestData.patientId || "",
        testTypeId: testRequestData.testTypeId || "",
        priority: testRequestData.priority || "ROUTINE",
        clinicalInfo: testRequestData.clinicalInfo || "",
        instructions: testRequestData.instructions || "",
        notes: testRequestData.notes || "",
      });
    } else {
      setForm({
        patientId: "",
        testTypeId: "",
        priority: "ROUTINE",
        clinicalInfo: "",
        instructions: "",
        notes: "",
      });
    }
  }, [testRequestData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form };
      console.log("Submitting TestRequest:", payload); // ✅ debug log

      if (isEditMode) {
        await axios.put(`${TEST_REQUESTS_URL}/${testRequestData.id}`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
      } else {
        await axios.post(TEST_REQUESTS_URL, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
      }
      onSubmit?.(payload);
      onClose();
    } catch (err) {
      console.error("Error saving test request:", err);
      alert("Failed to save test request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerWrapper
      title={isEditMode ? "Edit Test Request" : "Create Test Request"}
      onClose={onClose}
      isOpen={isOpen}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Patient Dropdown */}
        <select
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Test Type Dropdown (sends testTypeId) */}
        <select
          name="testTypeId"
          value={form.testTypeId}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        >
          <option value="">Select Test Type</option>
          {testTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="ROUTINE">Routine</option>
          <option value="URGENT">Urgent</option>
          <option value="STAT">Stat</option>
        </select>

        <textarea
          name="clinicalInfo"
          value={form.clinicalInfo}
          onChange={handleChange}
          placeholder="Clinical Info"
          className="w-full border rounded p-2"
        />
        <textarea
          name="instructions"
          value={form.instructions}
          onChange={handleChange}
          placeholder="Instructions"
          className="w-full border rounded p-2"
        />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="w-full border rounded p-2"
        />

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
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {loading ? "Saving..." : isEditMode ? "Save Changes" : "Save Request"}
          </button>
        </div>
      </form>
    </DrawerWrapper>
  );
};




// ---------------- SAMPLE DRAWER ----------------
export const SampleDrawer = ({ isOpen, onClose, sampleData, onSubmit }) => {
  const isEditMode = !!sampleData;
  const [form, setForm] = useState({
    testRequestId: "",
    barcode: "",
    sampleType: "",
    volume: "",
    collectedBy: "",
    storageLocation: "",
    expiresAt: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [testRequests, setTestRequests] = useState([]);
  const { auth } = useAuth();

  // Fetch test requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(TEST_REQUESTS_URL, {
          headers: { Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
        });
        setTestRequests(res.data?.data?.testRequests || []);
      } catch (err) {
        console.error("Error fetching test requests:", err);
      }
    };
    if (auth?.token) fetchRequests();
  }, [auth]);

  useEffect(() => {
    if (sampleData) {
      setForm({
        testRequestId: sampleData.testRequestId || "",
        barcode: sampleData.barcode || "",
        sampleType: sampleData.sampleType || "",
        volume: sampleData.volume || "",
        collectedBy: sampleData.collectedBy || "",
        storageLocation: sampleData.storageLocation || "",
        expiresAt: sampleData.expiresAt ? sampleData.expiresAt.split("T")[0] : "",
        notes: sampleData.notes || "",
      });
    } else {
      setForm({
        testRequestId: "",
        barcode: "",
        sampleType: "",
        volume: "",
        collectedBy: "",
        storageLocation: "",
        expiresAt: "",
        notes: "",
      });
    }
  }, [sampleData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form };
      console.log("Submitting Sample:", payload); // ✅ debug log

      if (isEditMode) {
        await axios.put(`${SAMPLES_URL}/${sampleData.id}`, payload, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
        });
      } else {
        await axios.post(SAMPLES_URL, payload, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
        });
      }
      onSubmit?.(payload);
      onClose();
    } catch (err) {
      console.error("Error saving sample:", err);
      alert("Failed to save sample");
    } finally {
      setLoading(false);
    }
  };


  return (
    <DrawerWrapper title={isEditMode ? "Edit Sample" : "Create Sample"} onClose={onClose} isOpen={isOpen}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <select name="testRequestId" value={form.testRequestId} onChange={handleChange} required className="w-full border rounded p-2">
          <option value="">Select Test Request</option>
          {testRequests.map((t) => (
            <option key={t.id} value={t.id}>
              {typeof t.testType === "object" ? t.testType.name : t.testType}
            </option>
          ))}
        </select>

        <input type="text" name="barcode" value={form.barcode} onChange={handleChange} placeholder="Barcode" required className="w-full border rounded p-2" />
        <input type="text" name="sampleType" value={form.sampleType} onChange={handleChange} placeholder="Sample Type" required className="w-full border rounded p-2" />
        <input type="text" name="volume" value={form.volume} onChange={handleChange} placeholder="Volume" className="w-full border rounded p-2" />
        <input type="text" name="collectedBy" value={form.collectedBy} onChange={handleChange} placeholder="Collected By" className="w-full border rounded p-2" />
        <input type="text" name="storageLocation" value={form.storageLocation} onChange={handleChange} placeholder="Storage Location" className="w-full border rounded p-2" />
        <input type="date" name="expiresAt" value={form.expiresAt} onChange={handleChange} className="w-full border rounded p-2" />
        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="w-full border rounded p-2" />

        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            {loading ? "Saving..." : isEditMode ? "Save Changes" : "Save Sample"}
          </button>
        </div>
      </form>
    </DrawerWrapper>
  );
};

// ---------------- LAB RESULT DRAWER ----------------
export const LabResultDrawer = ({ isOpen, onClose, labResultData, onSubmit }) => {
  const isEditMode = !!labResultData;
  const [form, setForm] = useState({
    sampleId: "",
    results: "{}",
    interpretation: "",
    flags: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [samples, setSamples] = useState([]);
  const { auth } = useAuth();

  // Fetch samples
  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const res = await axios.get(SAMPLES_URL, {
          headers: { Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
        });
        setSamples(res.data?.data?.samples || []);
      } catch (err) {
        console.error("Error fetching samples:", err);
      }
    };
    if (auth?.token) fetchSamples();
  }, [auth]);

  useEffect(() => {
    if (labResultData) {
      setForm({
        sampleId: labResultData.sampleId || "",
        results: JSON.stringify(labResultData.results || {}, null, 2),
        interpretation: labResultData.interpretation || "",
        flags: labResultData.flags || "",
        comments: labResultData.comments || "",
      });
    } else {
      setForm({
        sampleId: "",
        results: "{}",
        interpretation: "",
        flags: "",
        comments: "",
      });
    }
  }, [labResultData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        results: JSON.parse(form.results || "{}"), // parse JSON safely
      };
      console.log("Submitting LabResult:", payload); // ✅ debug log

      if (isEditMode) {
        await axios.put(`${LAB_RESULTS_URL}/${labResultData.id}`, payload, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
        });
      } else {
        await axios.post(LAB_RESULTS_URL, payload, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
          withCredentials: true,
        });
      }
      onSubmit?.(payload);
      onClose();
    } catch (err) {
      console.error("Error saving lab result:", err);
      alert("Failed to save lab result (check JSON in Results)");
    } finally {
      setLoading(false);
    }
  };
  return (
    <DrawerWrapper title={isEditMode ? "Edit Lab Result" : "Create Lab Result"} onClose={onClose} isOpen={isOpen}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <select name="sampleId" value={form.sampleId} onChange={handleChange} required className="w-full border rounded p-2">
          <option value="">Select Sample</option>
          {samples.map((s) => (
            <option key={s.id} value={s.id}>{s.barcode || s.id}</option>
          ))}
        </select>

        <textarea name="results" value={form.results} onChange={handleChange} placeholder='Results JSON (e.g. {"glucose": "5.5"})' required rows={6} className="w-full border rounded p-2 font-mono" />
        <input type="text" name="interpretation" value={form.interpretation} onChange={handleChange} placeholder="Interpretation" className="w-full border rounded p-2" />
        <input type="text" name="flags" value={form.flags} onChange={handleChange} placeholder="Flags" className="w-full border rounded p-2" />
        <textarea name="comments" value={form.comments} onChange={handleChange} placeholder="Comments" className="w-full border rounded p-2" />

        <div className="flex justify-end space-x-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            {loading ? "Saving..." : isEditMode ? "Save Changes" : "Save Result"}
          </button>
        </div>
      </form>
    </DrawerWrapper>
  );
};

