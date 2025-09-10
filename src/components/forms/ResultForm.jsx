import { useState } from 'react';
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { useNotifications } from '../../context/NotificationContext';
import { STATUS_TRANSITIONS } from '../../utils/constants';

export default function ResultForm({ initialData = {}, samples = [], onSubmit, onRelease, released = false }) {
  const [data, setData] = useState({ sampleId: '', data: { key: '' }, status: 'Pending', ...initialData });
  const { addNotification } = useNotifications();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
    addNotification('Result saved');
  };

  const allowedStatuses = STATUS_TRANSITIONS.result.slice(STATUS_TRANSITIONS.result.indexOf(data.status));

  if (released) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>; // Read-only
  }

  return (
    <form onSubmit={handleSubmit}>
      <Select label="Sample" value={data.sampleId} onChange={e => setData({ ...data, sampleId: e.target.value })}>
        {samples.map(s => <MenuItem key={s.id} value={s.id}>{s.barcode}</MenuItem>)}
      </Select>
      <TextField label="Data (JSON)" multiline value={JSON.stringify(data.data)} onChange={e => setData({ ...data, data: JSON.parse(e.target.value) })} />
      <Select label="Status" value={data.status} onChange={e => setData({ ...data, status: e.target.value })}>
        {allowedStatuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
      </Select>
      <Button type="submit">Save</Button>
      {data.status === 'Validated' && <Button onClick={onRelease}>Release</Button>}
    </form>
  );
}