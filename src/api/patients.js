let patients = [
  { id: 1, name: 'Alice Johnson', dob: '1985-02-14', active: true },
  { id: 2, name: 'Bob Smith', dob: '1990-06-30', active: true },
];

let nextId = 3;

export async function getPatients() {
  return patients;
}

export async function getPatient(id) {
  return patients.find(p => p.id === Number(id));
}

export async function addPatient(patient) {
  const newPatient = { ...patient, id: nextId++ };
  patients.push(newPatient);
  return newPatient;
}

export async function updatePatient(id, updated) {
  const index = patients.findIndex(p => p.id === Number(id));
  if (index !== -1) {
    patients[index] = { ...patients[index], ...updated };
    return patients[index];
  }
  throw new Error('Patient not found');
}

export async function deletePatient(id) {
  patients = patients.filter(p => p.id !== Number(id));
}