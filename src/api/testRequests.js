let testRequests = [
  { id: 1, patientId: 1, testType: 'Blood Test', status: 'Pending' },
];

let nextId = 2;

export async function getTestRequests() {
  return testRequests;
}

export async function getTestRequest(id) {
  return testRequests.find(tr => tr.id === Number(id));
}

export async function addTestRequest(request) {
  const newRequest = { ...request, id: nextId++, status: 'Pending' };
  testRequests.push(newRequest);
  return newRequest;
}

export async function updateTestRequest(id, updated) {
  const index = testRequests.findIndex(tr => tr.id === Number(id));
  if (index !== -1) {
    testRequests[index] = { ...testRequests[index], ...updated };
    return testRequests[index];
  }
  throw new Error('Test Request not found');
}