import { useNavigate } from 'react-router-dom';
import ResultForm from '../../components/forms/ResultForm';
import { addResult } from '../../api/results';
import { useEffect, useState } from 'react';
import { getSamples } from '../../api/samples';
import useAuthContext from '../../hooks/useAuth';

export default function ResultCreate() {
  const navigate = useNavigate();
  const [samples, setSamples] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    getSamples().then(setSamples);
  }, []);

  if (user.role !== 'LabStaff') return <div>Access Denied</div>;

  const handleSubmit = async (data) => {
    await addResult(data);
    navigate('/results');
  };

  return (
    <div className="p-4">
      <h2>Create Result</h2>
      <ResultForm samples={samples} onSubmit={handleSubmit} />
    </div>
  );
}