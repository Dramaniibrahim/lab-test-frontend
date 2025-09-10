import { Link } from 'react-router-dom';
import PatientsTable from '../../components/tables/PatientsTable';
import { useEffect, useState } from 'react';
import { getPatients, deletePatient } from '../../api/patients';

export default function NurseDashboard() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatients().then(setPatients);
  }, []);

  const handleDelete = async (id) => {
    await deletePatient(id);
    setPatients(await getPatients());
  };

  return (
    <div className="p-4">
      <h2>Nurse Dashboard</h2>
      <Link to="/patients/create">Create Patient</Link>
      <Link to="/test-requests/create">Create Test Request</Link>
      <PatientsTable patients={patients} onDelete={handleDelete} />
    </div>
  );
}