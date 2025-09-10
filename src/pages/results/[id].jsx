import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResultForm from '../../components/forms/ResultForm';
import { getResult, updateResult, releaseResult } from '../../api/results';
import { getSamples } from '../../api/samples';
import useAuthContext from '../../hooks/useAuth';
import { useNotifications } from '../../context/NotificationContext';

export default function ResultEdit() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [samples, setSamples] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { addNotification } = useNotifications();

  useEffect(() => {
    getResult(id).then(setResult);
    getSamples().then(setSamples);
  }, [id]);

  if (!result) return <div>Loading...</div>;
  if (!['LabStaff', 'SeniorLabStaff'].includes(user.role)) return <div>Access Denied</div>;

  const handleSubmit = async (data) => {
    await updateResult(id, data);
    setResult(await getResult(id));
  };

  const handleRelease = async () => {
    if (user.role === 'SeniorLabStaff') {
      await releaseResult(id);
      addNotification('Result released');
      setResult(await getResult(id));
    } else {
      alert('Only Senior can release');
    }
  };

  return (
    <div className="p-4">
      <h2>Edit Result</h2>
      <ResultForm initialData={result} samples={samples} onSubmit={handleSubmit} onRelease={handleRelease} released={result.released} />
    </div>
  );
}