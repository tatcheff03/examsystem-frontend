import { useKeycloak } from "../components/useKeycloak.js";

// Generic fetch wrapper with debug
const useAuthFetch = (baseUrl) => {
  const { keycloak } = useKeycloak();

  const authHeaders = (hasBody = false) => {
    if (!keycloak) throw new Error("Keycloak not initialized");
    return {
      ...(hasBody && { "Content-Type": "application/json" }),
      Authorization: `Bearer ${keycloak.token}`,
    };
  };

  const fetchWithAuth = async (url, options = {}, hasBody = false) => {
    if (!keycloak) throw new Error("Keycloak not initialized");

    console.log("✅ Fetching:", `${baseUrl}${url}`);
    console.log("Keycloak token exists:", !!keycloak.token);

    // refresh token if about to expire
    try {
      const refreshed = await keycloak.updateToken(30);
      console.log("Token refreshed:", refreshed);
    } catch (err) {
      console.warn("Token refresh failed, redirecting to login", err);
      keycloak.login();
      return;
    }

    try {
      const res = await fetch(`${baseUrl}${url}`, {
        ...options,
        headers: authHeaders(hasBody),
        credentials: 'include', // needed if cookies are involved
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errText = await res.text();
        console.error("Fetch error text:", errText);
        throw new Error(errText || res.statusText);
      }

      const contentType = res.headers.get("content-type");
      return contentType?.includes("application/json") ? res.json() : res.text();
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      throw err;
    }
  };

  return fetchWithAuth;
};

export default useAuthFetch;
