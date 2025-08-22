const BASE_URL = "http://localhost:8080/admin";

export async function sendInvite(email) {
  const response = await fetch(`${BASE_URL}/send-invite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return response.text();
}

export async function registerAdmin(admin) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(admin),
  });
  return response.json();
}

export async function sendResult(studentId, testId) {
  const response = await fetch(`${BASE_URL}/send-result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentId, testId }),
  });
  return response.text();
}
