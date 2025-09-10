import useAuthFetch from "./useAuthFetch.js";

const BASE_URL = "http://localhost:8081/results";

export const useResultsApi = () => {
  const fetchWithAuth = useAuthFetch(BASE_URL);

  // Admin/Examiner fetch by numeric student ID + test ID
  const getResult = async (studentId, testId) => {
    console.log("Calling getResult:", studentId, testId);
    return fetchWithAuth(`/student/${studentId}/test/${testId}`);
  };

  // Student fetch all their own results
  const getMyResults = async () => {
    console.log("Calling getMyResults");
    return fetchWithAuth(`/student/self`);
  };

  return { getResult, getMyResults };
};
