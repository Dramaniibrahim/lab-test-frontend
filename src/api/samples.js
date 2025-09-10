let samples = [
  { id: 1, testRequestId: 1, barcode: 'SAMPLE-001', status: 'Pending' },
];

let nextId = 2;

export async function getSamples() {
  return samples;
}

export async function getSample(id) {
  return samples.find(s => s.id === Number(id));
}

export async function addSample(sample) {
  const newSample = { ...sample, id: nextId++, status: 'Pending' };
  samples.push(newSample);
  return newSample;
}

export async function updateSample(id, updated) {
  const index = samples.findIndex(s => s.id === Number(id));
  if (index !== -1) {
    samples[index] = { ...samples[index], ...updated };
    return samples[index];
  }
  throw new Error('Sample not found');
}