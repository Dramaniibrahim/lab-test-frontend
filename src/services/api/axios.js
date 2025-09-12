import axios from 'axios';

export default axios.create({
  baseURL: 'https://labtest-production-4ddc.up.railway.app/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});