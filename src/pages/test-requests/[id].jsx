import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TestRequestForm from '../../components/forms/TestRequestForm';
import { getTestRequest, updateTestRequest } from '../../api/testRequests';
import { getPatients } from '../../api/patients';
import useAuthContext from '../../hooks/useAuth';

export default function TestRequestEdit() {
  const { id } = useParams();
  const [testRequest, setTestRequest] = useState(null);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    getTestRequest(id).then(setTestRequest);
    getPatients().then(setPatients);
  }, [id]);

  if (!testRequest) return <div>Loading...</div>;
  if (!['Doctor', 'Nurse'].includes(user.role)) return <div>Access Denied</div>;

  const handleSubmit = async (data) => {
    await updateTestRequest(id, data);
    navigate('/test-requests');
  };

  return (
    <div className="p-4">
      <h2>Edit Test Request</h2>
      <TestRequestForm initialData={testRequest} patients={patients} onSubmit={handleSubmit} />
    </div>
  );
}