export const ROLES = {
  ADMIN: 'Admin',
  DOCTOR: 'Doctor',
  NURSE: 'Nurse',
  LAB_STAFF: 'LabStaff',
  SENIOR_LAB_STAFF: 'SeniorLabStaff',
};

export const STATUS_TRANSITIONS = {
  testRequest: ['Pending', 'Processing', 'Completed'],
  sample: ['Pending', 'Collected', 'In Transit', 'Received', 'Processing', 'Processed'],
  result: ['Pending', 'Validated', 'Released'],
};