const BASE_URL = "http://localhost:8080/admin";

export async function sendInvite(email, testId) {
  const response = await fetch(`${BASE_URL}/send-invite`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, testId }),
  });
  return response.text();
}

export async function getAllAdmins() {
  const response = await fetch(`${BASE_URL}/list`); // or whichever endpoint returns all admins
  return response.json();
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
