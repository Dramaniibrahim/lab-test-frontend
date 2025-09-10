import { Link } from 'react-router-dom';
import SamplesTable from '../../components/tables/SamplesTable';
import ResultsTable from '../../components/tables/ResultsTable';
import { useEffect, useState } from 'react';
import { getSamples } from '../../api/samples';
import { getResults } from '../../api/results';

export default function LabStaffDashboard() {
  const [samples, setSamples] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    getSamples().then(setSamples);
    getResults().then(setResults);
  }, []);

  return (
    <div className="p-4">
      <h2>Lab Staff Dashboard</h2>
      <Link to="/samples/create">Process Sample</Link>
      <Link to="/results/create">Enter Result</Link>
      <SamplesTable samples={samples} />
      <ResultsTable results={results} />
    </div>
  );
}