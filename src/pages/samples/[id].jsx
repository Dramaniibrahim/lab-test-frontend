import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SampleForm from '../../components/forms/SampleForm';
import { getSample, updateSample } from '../../api/samples';
import { getTestRequests } from '../../api/testRequests';
import useAuthContext from '../../hooks/useAuth';

export default function SampleEdit() {
  const { id } = useParams();
  const [sample, setSample] = useState(null);
  const [testRequests, setTestRequests] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    getSample(id).then(setSample);
    getTestRequests().then(setTestRequests);
  }, [id]);

  if (!sample) return <div>Loading...</div>;
  if (user.role !== 'LabStaff') return <div>Access Denied</div>;

  const handleSubmit = async (data) => {
    await updateSample(id, data);
    navigate('/samples');
  };

  return (
    <div className="p-4">
      <h2>Edit Sample</h2>
      <SampleForm initialData={sample} testRequests={testRequests} onSubmit={handleSubmit} />
    </div>
  );
}