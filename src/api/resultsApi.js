const BASE_URL = "http://localhost:8080/results";

export async function getResult(studentId, testId) {
  const response = await fetch(`${BASE_URL}/student/${studentId}/test/${testId}`);
  return response.json();
}
