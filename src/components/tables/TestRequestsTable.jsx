import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

export default function TestRequestsTable({ testRequests }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Patient ID</TableCell>
          <TableCell>Test Type</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {testRequests.map(tr => (
          <TableRow key={tr.id}>
            <TableCell>{tr.id}</TableCell>
            <TableCell>{tr.patientId}</TableCell>
            <TableCell>{tr.testType}</TableCell>
            <TableCell>{tr.status}</TableCell>
            <TableCell><Link to={`/test-requests/${tr.id}`}>Edit</Link></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}