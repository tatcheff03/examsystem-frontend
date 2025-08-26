const BASE_URL = "http://localhost:8080/examiner";

export async function registerExaminer(examiner) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(examiner),
  });
  return response.json();
}

export async function modifyTestPaper(testPaper) {
  const response = await fetch(`${BASE_URL}/test-papers`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testPaper),
  });
  return response.text();
}

export async function declareResults(testId) {
  const response = await fetch(`${BASE_URL}/tests/${testId}/declare-results`, {
    method: "POST",
  });
  return response.text();
}

export async function checkCopies(testId) {
  const response = await fetch(`${BASE_URL}/tests/${testId}/check-copies`, {
    method: "POST",
  });
  return response.text();
}

export async function checkResults(studentId, testId) {
  const response = await fetch(`${BASE_URL}/results/${studentId}/${testId}`);
  if (!response.ok) throw new Error("Result not found");
  return response.json();
}


export async function getTestsByExaminer(examinerId) {
  const response = await fetch(`${BASE_URL}/tests/${examinerId}`);
  return response.json();
}

