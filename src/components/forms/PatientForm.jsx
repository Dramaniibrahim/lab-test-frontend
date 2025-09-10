import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { validatePatient } from '../../utils/validators';
import { useNotifications } from '../../context/NotificationContext';

export default function PatientForm({ initialData = {}, onSubmit }) {
  const [data, setData] = useState({ name: '', dob: '', active: true, ...initialData });
  const { addNotification } = useNotifications();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePatient(data)) {
      onSubmit(data);
      addNotification('Patient saved');
    } else {
      alert('Invalid data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField label="Name" value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
      <TextField label="DOB" type="date" value={data.dob} onChange={e => setData({ ...data, dob: e.target.value })} />
      <Button type="submit">Save</Button>
    </form>
  );
}