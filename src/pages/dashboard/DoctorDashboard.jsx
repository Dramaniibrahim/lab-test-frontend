import { Link } from 'react-router-dom';
import TestRequestsTable from '../../components/tables/TestRequestsTable';
import { useEffect, useState } from 'react';
import { getTestRequests } from '../../api/testRequests';

export default function DoctorDashboard() {
  const [testRequests, setTestRequests] = useState([]);

  useEffect(() => {
    getTestRequests().then(setTestRequests);
  }, []);

  return (
    <div className="p-4">
      <h2>Doctor Dashboard</h2>
      <Link to="/test-requests/create">Create Test Request</Link>
      <TestRequestsTable testRequests={testRequests} />
    </div>
  );
}