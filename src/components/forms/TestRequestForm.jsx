import { useState } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { validateTestRequest } from '../../utils/validators';
import { useNotifications } from '../../context/NotificationContext';
import { STATUS_TRANSITIONS } from '../../utils/constants';

export default function TestRequestForm({ initialData = {}, patients = [], onSubmit }) {
  const [data, setData] = useState({ patientId: '', testType: '', status: 'Pending', ...initialData });
  const { addNotification } = useNotifications();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateTestRequest(data)) {
      onSubmit(data);
      addNotification('Test Request saved');
    } else {
      alert('Invalid data');
    }
  };

  const allowedStatuses = STATUS_TRANSITIONS.testRequest.slice(STATUS_TRANSITIONS.testRequest.indexOf(data.status));

  return (
    <form onSubmit={handleSubmit}>
      <Select label="Patient" value={data.patientId} onChange={e => setData({ ...data, patientId: e.target.value })}>
        {patients.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
      </Select>
      <TextField label="Test Type" value={data.testType} onChange={e => setData({ ...data, testType: e.target.value })} />
      <Select label="Status" value={data.status} onChange={e => setData({ ...data, status: e.target.value })}>
        {allowedStatuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
      </Select>
      <Button type="submit">Save</Button>
    </form>
  );
}