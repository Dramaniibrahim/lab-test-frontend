import { getPatients } from './patients';
import { getTestRequests } from './testRequests';

export async function getReports() {
  const patients = await getPatients();
  const testRequests = await getTestRequests();
  const totalPatients = patients.length;
  const pendingRequests = testRequests.filter(tr => tr.status === 'Pending').length;
  const completedTests = testRequests.filter(tr => tr.status === 'Completed').length;
  return { totalPatients, pendingRequests, completedTests };
}