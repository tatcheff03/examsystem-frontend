import useAuthFetch from "./useAuthFetch.js";

const BASE_URL = "http://localhost:8081/responses";

export const useResponsesApi = () => {
  const fetchWithAuth = useAuthFetch(BASE_URL);

  const addResponse = (responseData) =>
    fetchWithAuth("/add", { method: "POST", body: JSON.stringify(responseData) }, true);

  const getDetailedResponses = (studentId, testId) =>
    fetchWithAuth(`/detailed/${studentId}/${testId}`);

  return { addResponse, getDetailedResponses };
};
