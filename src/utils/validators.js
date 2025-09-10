// Simple validators (minimal)
export const validatePatient = (patient) => {
  return patient.name && patient.dob;
};

export const validateTestRequest = (request) => {
  return request.patientId && request.testType;
};

// Add more as needed