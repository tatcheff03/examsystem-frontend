const BASE_URL = "http://localhost:8080/student";

export async function registerStudent(student) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  return response.json();
}

export async function registerForTest(studentId, testId) {
  const response = await fetch(`${BASE_URL}/${studentId}/register/${testId}`, {
    method: "POST",
  });
  return response.text();
}

export async function giveExam(studentId, testId, answers) {
  const response = await fetch(`${BASE_URL}/${studentId}/give-exam/${testId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers),
  });
  return response.text();
}

export async function getResults(studentId, testId) {
  const response = await fetch(`${BASE_URL}/${studentId}/results/${testId}`);
  return response.json();
}

export async function getTestPapersForTest(studentId, testId) {
  const response = await fetch(`${BASE_URL}/${studentId}/test-papers/${testId}`);
  return response.json();
}

export async function getResultsForStudent(studentId) {
  const response = await fetch(`${BASE_URL}/${studentId}/results`);
  return response.json();
}

export async function getResponses(studentId, testId) {
  const response = await fetch(`${BASE_URL}/${studentId}/responses/${testId}`);
  return response.json();
}
