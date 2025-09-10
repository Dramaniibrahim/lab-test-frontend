import { useNavigate } from 'react-router-dom';
import PatientForm from '../../components/forms/PatientForm';
import { addPatient } from '../../api/patients';
import useAuthContext from '../../hooks/useAuth';

export default function PatientCreate() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  if (!['Admin', 'Nurse'].includes(user.role)) return <div>Access Denied</div>;

  const handleSubmit = async (data) => {
    await addPatient(data);
    navigate('/patients');
  };

  return (
    <div className="p-4">
      <h2>Create Patient</h2>
      <PatientForm onSubmit={handleSubmit} />
    </div>
  );
}