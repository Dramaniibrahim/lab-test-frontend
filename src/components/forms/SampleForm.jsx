import { useState } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { useNotifications } from '../../context/NotificationContext';
import { STATUS_TRANSITIONS } from '../../utils/constants';

export default function SampleForm({ initialData = {}, testRequests = [], onSubmit }) {
  const [data, setData] = useState({ testRequestId: '', barcode: '', status: 'Pending', ...initialData });
  const { addNotification } = useNotifications();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
    addNotification('Sample saved');
  };

  const allowedStatuses = STATUS_TRANSITIONS.sample.slice(STATUS_TRANSITIONS.sample.indexOf(data.status));

  return (
    <form onSubmit={handleSubmit}>
      <Select label="Test Request" value={data.testRequestId} onChange={e => setData({ ...data, testRequestId: e.target.value })}>
        {testRequests.map(tr => <MenuItem key={tr.id} value={tr.id}>{tr.testType}</MenuItem>)}
      </Select>
      <TextField label="Barcode" value={data.barcode} onChange={e => setData({ ...data, barcode: e.target.value })} />
      <Select label="Status" value={data.status} onChange={e => setData({ ...data, status: e.target.value })}>
        {allowedStatuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
      </Select>
      <Button type="submit">Save</Button>
    </form>
  );
}