import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ResultsTable({ results }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Sample ID</TableCell>
          <TableCell>Data</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Released</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {results.map(r => (
          <TableRow key={r.id}>
            <TableCell>{r.id}</TableCell>
            <TableCell>{r.sampleId}</TableCell>
            <TableCell>{JSON.stringify(r.data)}</TableCell>
            <TableCell>{r.status}</TableCell>
            <TableCell>{r.released ? 'Yes' : 'No'}</TableCell>
            <TableCell><Link to={`/results/${r.id}`}>View/Edit</Link></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}