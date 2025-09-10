import { useNavigate } from 'react-router-dom';
import TestRequestForm from '../../components/forms/TestRequestForm';
import { addTestRequest } from '../../api/testRequests';
import { useEffect, useState } from 'react';
import { getPatients } from '../../api/patients';
import useAuthContext from '../../hooks/useAuth';

export default function TestRequestCreate() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    getPatients().then(setPatients);
  }, []);

  if (!['Doctor', 'Nurse'].includes(user.role)) return <div>Access Denied</div>;

  const handleSubmit = async (data) => {
    await addTestRequest(data);
    navigate('/test-requests');
  };

  return (
    <div className="p-4">
      <h2>Create Test Request</h2>
      <TestRequestForm patients={patients} onSubmit={handleSubmit} />
    </div>
  );
}