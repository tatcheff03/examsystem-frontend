import useAuthFetch from "./useAuthFetch.js";

const BASE_URL = "http://localhost:8081/examiner";

export const useExaminerApi = () => {
  const fetchWithAuth = useAuthFetch(BASE_URL);

  const registerExaminer = (examiner) =>
    fetchWithAuth("/register", { method: "POST", body: JSON.stringify(examiner) }, true);

  const modifyTestPaper = (testPaper) =>
    fetchWithAuth("/test-papers", { method: "PUT", body: JSON.stringify(testPaper) }, true);

  const declareResults = (testId) =>
    fetchWithAuth(`/tests/${testId}/declare-results`, { method: "POST" }, false);

  const checkCopies = (testId) =>
    fetchWithAuth(`/tests/${testId}/check-copies`, { method: "POST" }, false);

  const checkResults = (studentId, testId) =>
    fetchWithAuth(`/results/${studentId}/${testId}`);

  const getTestsByExaminer = (examinerId) =>
    fetchWithAuth(`/tests/${examinerId}`);

  return { registerExaminer, modifyTestPaper, declareResults, checkCopies, checkResults, getTestsByExaminer };
};
