import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SamplesTable({ samples }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Test Request ID</TableCell>
          <TableCell>Barcode</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {samples.map(s => (
          <TableRow key={s.id}>
            <TableCell>{s.id}</TableCell>
            <TableCell>{s.testRequestId}</TableCell>
            <TableCell>{s.barcode}</TableCell>
            <TableCell>{s.status}</TableCell>
            <TableCell><Link to={`/samples/${s.id}`}>Edit</Link></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}