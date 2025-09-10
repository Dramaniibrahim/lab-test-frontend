import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Login from './pages/auth/Login';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import NurseDashboard from './pages/dashboard/NurseDashboard';
import LabStaffDashboard from './pages/dashboard/LabStaffDashboard';
import SeniorLabStaffDashboard from './pages/dashboard/SeniorLabStaffDashboard';
import PatientsList from './pages/patients/index';
import PatientCreate from './pages/patients/create';
import PatientEdit from './pages/patients/[id]';
import TestRequestsList from './pages/test-requests/index';
import TestRequestCreate from './pages/test-requests/create';
import TestRequestEdit from './pages/test-requests/[id]';
import SamplesList from './pages/samples/index';
import SampleCreate from './pages/samples/create';
import SampleEdit from './pages/samples/[id]';
import ResultsList from './pages/results/index';
import ResultCreate from './pages/results/create';
import ResultEdit from './pages/results/[id]';
import Reports from './pages/reports/index';
import useAuthContext from './hooks/useAuth';
import SchedulePage from './pages/schedules';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute />}>
              <Route index element={<DashboardRouter />} />
              <Route path="patients" element={<PatientsList />} />
              <Route path="schedules" element={<SchedulePage />} />
              <Route path="patients/create" element={<PatientCreate />} />
              <Route path="patients/:id" element={<PatientEdit />} />
              <Route path="test-requests" element={<TestRequestsList />} />
              <Route path="test-requests/create" element={<TestRequestCreate />} />
              <Route path="test-requests/:id" element={<TestRequestEdit />} />
              <Route path="samples" element={<SamplesList />} />
              <Route path="samples/create" element={<SampleCreate />} />
              <Route path="samples/:id" element={<SampleEdit />} />
              <Route path="results" element={<ResultsList />} />
              <Route path="results/create" element={<ResultCreate />} />
              <Route path="results/:id" element={<ResultEdit />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

function DashboardRouter() {
  const { user } = useAuthContext();
  if (!user) return null;
  switch (user.role) {
    case 'Admin': return <AdminDashboard />;
    case 'Doctor': return <DoctorDashboard />;
    case 'Nurse': return <NurseDashboard />;
    case 'LabStaff': return <LabStaffDashboard />;
    case 'SeniorLabStaff': return <SeniorLabStaffDashboard />;
    default: return <div>Invalid role</div>;
  }
}

export default App;