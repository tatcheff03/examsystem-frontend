const BASE_URL = "http://localhost:8080/testpapers";

export async function addTestPaper(testPaper) {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testPaper),
  });
  return response.json();
}

export async function getTestPapersByTestId(testId) {
  const response = await fetch(`${BASE_URL}/test/${testId}`);
  return response.json();
}

export async function getTestPaperById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
}
