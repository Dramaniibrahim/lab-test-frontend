const users = [
  { username: 'admin', password: 'admin123', role: 'Admin' },
  { username: 'doctor', password: 'doctor123', role: 'Doctor' },
  { username: 'lab', password: 'lab123', role: 'LabStaff' },
  { username: 'senior', password: 'senior123', role: 'SeniorLabStaff' },
  { username: 'nurse', password: 'nurse123', role: 'Nurse' },
];

export async function login(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) throw new Error('Invalid credentials');
  return { token: 'mock-token', user };
}