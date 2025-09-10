import useAuthFetch from "./useAuthFetch.js";

const BASE_URL = "/admin";

export const useAdminApi = () => {
  const fetchWithAuth = useAuthFetch(BASE_URL);

  const sendInvite = (email, testId) =>
    fetchWithAuth("/send-invite", { method: "POST", body: JSON.stringify({ email, testId }) }, true);

  const getAllAdmins = () =>
    fetchWithAuth("/list");

  const registerAdmin = (admin) =>
    fetchWithAuth("/register", { method: "POST", body: JSON.stringify(admin) }, true);

  const sendResult = (studentId, testId) =>
    fetchWithAuth("/send-result", { method: "POST", body: JSON.stringify({ studentId, testId }) }, true);

  return { sendInvite, getAllAdmins, registerAdmin, sendResult };
};
