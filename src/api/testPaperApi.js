import useAuthFetch from "./useAuthFetch.js";

const BASE_URL = "http://localhost:8081/testpapers";

export const useTestPapersApi = () => {
  const fetchWithAuth = useAuthFetch(BASE_URL);

  const addTestPaper = (testPaper) =>
    fetchWithAuth("/add", { method: "POST", body: JSON.stringify(testPaper) }, true);

  const getTestPapersByTestId = (testId) =>
    fetchWithAuth(`/test/${testId}`);

  const getTestPaperById = (id) =>
    fetchWithAuth(`/${id}`);

  return { addTestPaper, getTestPapersByTestId, getTestPaperById };
};
