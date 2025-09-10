import { Link } from 'react-router-dom';
import ResultsTable from '../../components/tables/ResultsTable';
import { useEffect, useState } from 'react';
import { getResults } from '../../api/results';

export default function SeniorLabStaffDashboard() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults().then(setResults);
  }, []);

  return (
    <div className="p-4">
      <h2>Senior Lab Staff Dashboard</h2>
      <Link to="/results">Validate Results</Link>
      <Link to="/reports">Reports</Link>
      <ResultsTable results={results} />
    </div>
  );
}