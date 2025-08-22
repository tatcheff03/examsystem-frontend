const BASE_URL = "http://localhost:8080/tests";

export async function addTest(test) {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(test),
  });
  return response.json();
}

export async function getAllTests() {
  const response = await fetch(`${BASE_URL}/`);
  return response.json();
}

export async function getTestsByExaminer(examinerId) {
  const response = await fetch(`${BASE_URL}/examiner/${examinerId}`);
  return response.json();
}

export async function getTestById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
}
