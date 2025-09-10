import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PatientForm from '../../components/forms/PatientForm';
import { getPatient, updatePatient } from '../../api/patients';
import useAuthContext from '../../hooks/useAuth';

export default function PatientEdit() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    getPatient(id).then(setPatient);
  }, [id]);

  if (!patient) return <div>Loading...</div>;
  if (!['Admin', 'Nurse'].includes(user.role)) return <div>Access Denied</div>;

  const handleSubmit = async (data) => {
    await updatePatient(id, data);
    navigate('/patients');
  };

  return (
    <div className="p-4">
      <h2>Edit Patient</h2>
      <PatientForm initialData={patient} onSubmit={handleSubmit} />
    </div>
  );
}