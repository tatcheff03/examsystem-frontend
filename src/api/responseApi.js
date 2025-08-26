const BASE_URL = "http://localhost:8080/responses";

export async function addResponse(response) {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response),
  });
  return res.json();
}

export async function getDetailedResponses(studentId, testId) {
  const response = await fetch(`${BASE_URL}/detailed/${studentId}/${testId}`);
  if (!response.ok) throw new Error("Failed to fetch detailed responses");
  return response.json();
}
