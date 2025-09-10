import { useNavigate } from 'react-router-dom';
import SampleForm from '../../components/forms/SampleForm';
import { addSample } from '../../api/samples';
import { useEffect, useState } from 'react';
import { getTestRequests } from '../../api/testRequests';
import useAuthContext from '../../hooks/useAuth';

export default function SampleCreate() {
  const navigate = useNavigate();
  const [testRequests, setTestRequests] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    getTestRequests().then(setTestRequests);
  }, []);

  if (user.role !== 'LabStaff') return <div>Access Denied</div>;

  const handleSubmit = async (data) => {
    await addSample(data);
    navigate('/samples');
  };

  return (
    <div className="p-4">
      <h2>Create Sample</h2>
      <SampleForm testRequests={testRequests} onSubmit={handleSubmit} />
    </div>
  );
}