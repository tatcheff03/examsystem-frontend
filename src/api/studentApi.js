import useAuthFetch from "./useAuthFetch.js";

const BASE_URL = "http://localhost:8081/student";

export const useStudentApi = () => {
  const fetchWithAuth = useAuthFetch(BASE_URL);

  const registerStudent = (student) =>
    fetchWithAuth("/register", { method: "POST", body: JSON.stringify(student) }, true);

  const registerForTest = (studentId, testId) =>
    fetchWithAuth(`/${studentId}/register/${testId}`, { method: "POST" }, false);

  const giveExam = (studentId, testId, answers) =>
    fetchWithAuth(`/${studentId}/give-exam/${testId}`, { method: "POST", body: JSON.stringify(answers) }, true);

  const getResults = (studentId, testId) =>
    fetchWithAuth(`/${studentId}/results/${testId}`);

  const getTestPapersForTest = (studentId, testId) =>
    fetchWithAuth(`/${studentId}/test-papers/${testId}`);

  const getResultsForStudent = (studentId) =>
    fetchWithAuth(`/${studentId}/results`);

  const getResponses = (studentId, testId) =>
    fetchWithAuth(`/${studentId}/responses/${testId}`);

  return { registerStudent, registerForTest, giveExam, getResults, getTestPapersForTest, getResultsForStudent, getResponses };
};
