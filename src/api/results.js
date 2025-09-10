let results = [
  { id: 1, sampleId: 1, data: { glucose: 90 }, status: 'Pending', released: false },
];

let nextId = 2;

export async function getResults() {
  return results;
}

export async function getResult(id) {
  return results.find(r => r.id === Number(id));
}

export async function addResult(result) {
  const newResult = { ...result, id: nextId++, status: 'Pending', released: false };
  results.push(newResult);
  return newResult;
}

export async function updateResult(id, updated) {
  const index = results.findIndex(r => r.id === Number(id));
  if (index !== -1) {
    results[index] = { ...results[index], ...updated };
    return results[index];
  }
  throw new Error('Result not found');
}

export async function releaseResult(id) {
  const index = results.findIndex(r => r.id === Number(id));
  if (index !== -1) {
    results[index].released = true;
    results[index].status = 'Released';
    return results[index];
  }
  throw new Error('Result not found');
}