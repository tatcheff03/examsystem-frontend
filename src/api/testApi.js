import useAuthFetch from "./useAuthFetch.js";

const BASE_URL = "http://localhost:8081/tests";

export const useTestsApi = () => {
  const fetchWithAuth = useAuthFetch(BASE_URL);

  const addTest = (test) =>
    fetchWithAuth("/add", { method: "POST", body: JSON.stringify(test) }, true);

  const getAllTests = () =>
    fetchWithAuth("/");

  const getTestsByExaminer = (examinerId) =>
    fetchWithAuth(`/examiner/${examinerId}`);

  const getTestById = (id) =>
    fetchWithAuth(`/${id}`);

  return { addTest, getAllTests, getTestsByExaminer, getTestById };
};
