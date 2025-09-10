// Role-based permissions (can be used for conditional rendering)
export const canAccessPatients = (role) => ['Admin', 'Doctor', 'Nurse'].includes(role);
export const canCreateTestRequests = (role) => ['Doctor', 'Nurse'].includes(role);
export const canProcessSamples = (role) => ['LabStaff'].includes(role);
export const canEnterResults = (role) => ['LabStaff'].includes(role);
export const canValidateResults = (role) => ['SeniorLabStaff'].includes(role);
export const canViewReports = (role) => ['Admin', 'SeniorLabStaff'].includes(role);