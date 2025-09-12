import { useContext, useEffect, useState } from "react";
import axios from "./axios";
import {
  PATIENTS_URL,
  PATIENT_BY_ID_URL,
  PATIENT_STATS_URL,
  TEST_REQUESTS_URL,
  TEST_REQUEST_BY_ID_URL,
  TEST_REQUEST_SUMMARY_URL,
  SAMPLES_URL,
  SAMPLE_BY_ID_URL,
  SAMPLE_BY_BARCODE_URL,
  SAMPLE_SUMMARY_URL,
  LAB_RESULTS_URL,
  LAB_RESULT_BY_ID_URL,
  VALIDATE_RESULT_URL,
  RELEASE_RESULT_URL,
  LAB_RESULT_SUMMARY_URL,
} from "./routes";
import { useAuth } from "../../context/AuthContext";

/************************************************ Patients *************************************/
export function usePatientsData() {
  const { auth } = useAuth();
  const [patients, setPatients] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(PATIENTS_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      setPatients(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth]);

  return { patients, fetchData };
}

export function usePatientByIdData(id) {
  const { auth } = useContext(useAuthContext);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(PATIENT_BY_ID_URL(id), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setPatient(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchData();
  }, [auth, id]);

  return { patient };
}

export function usePatientStats() {
  const { auth } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(PATIENT_STATS_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setStats(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [auth]);

  return { stats };
}

/************************************************ Test Requests *************************************/
export function useTestRequestsData() {
  const { auth } = useContext(AuthContext);
  const [testRequests, setTestRequests] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(TEST_REQUESTS_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      setTestRequests(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth]);

  return { testRequests, fetchData };
}

export function useTestRequestById(id) {
  const { auth } = useContext(AuthContext);
  const [testRequest, setTestRequest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(TEST_REQUEST_BY_ID_URL(id), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setTestRequest(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchData();
  }, [auth, id]);

  return { testRequest };
}

export function useTestRequestSummary() {
  const { auth } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(TEST_REQUEST_SUMMARY_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setSummary(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [auth]);

  return { summary };
}

/************************************************ Samples *************************************/
export function useSamplesData() {
  const { auth } = useContext(AuthContext);
  const [samples, setSamples] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(SAMPLES_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      setSamples(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth]);

  return { samples, fetchData };
}

export function useSampleById(id) {
  const { auth } = useContext(AuthContext);
  const [sample, setSample] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(SAMPLE_BY_ID_URL(id), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setSample(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchData();
  }, [auth, id]);

  return { sample };
}

/************************************************ Lab Results *************************************/
export function useLabResultsData() {
  const { auth } = useContext(AuthContext);
  const [labResults, setLabResults] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(LAB_RESULTS_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        withCredentials: true,
      });
      setLabResults(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth]);

  return { labResults, fetchData };
}

export function useLabResultById(id) {
  const { auth } = useContext(AuthContext);
  const [labResult, setLabResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(LAB_RESULT_BY_ID_URL(id), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          withCredentials: true,
        });
        setLabResult(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchData();
  }, [auth, id]);

  return { labResult };
}
