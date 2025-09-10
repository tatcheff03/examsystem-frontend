import React, { useState, useEffect } from "react";
import Keycloak from "keycloak-js";
import KeycloakContext from "./KeycloakContext";

export const KeycloakProvider = ({ children }) => {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [tokenDecoded, setTokenDecoded] = useState(null);

  useEffect(() => {
    console.log("[KeycloakProvider] Initializing Keycloak...");
    const kc = new Keycloak({
      url: "http://localhost:8080",
      realm: "examsystem-realm",
      clientId: "examsystem-client",
    });

    kc.init({
      onLoad: "login-required",
      pkceMethod: "S256",
      checkLoginIframe: false,
    })
      .then((auth) => {
        if (!auth) {
          console.log("[KeycloakProvider] Not authenticated, redirecting...");
          kc.login();
          return;
        }

        console.log("[KeycloakProvider] Authenticated! Token:", kc.token);

        localStorage.setItem("kc_token", kc.token);
        localStorage.setItem("kc_refreshToken", kc.refreshToken);

        try {
          const decoded = JSON.parse(atob(kc.token.split(".")[1]));
          setTokenDecoded(decoded);
          console.log("[KeycloakProvider] Decoded token:", decoded);
        } catch (err) {
          console.warn("[KeycloakProvider] Failed to decode token:", err);
        }

        setKeycloak(kc);
        setAuthenticated(true);

        // 🔄 token refresh inside .then after auth
        const refreshInterval = setInterval(() => {
          if (kc && kc.token) {
            kc.updateToken(30)
              .then((refreshed) => {
                if (refreshed) {
                  console.log("[KeycloakProvider] Token refreshed ✅");
                  localStorage.setItem("kc_token", kc.token);
                  localStorage.setItem("kc_refreshToken", kc.refreshToken);
                  try {
                    const decoded = JSON.parse(atob(kc.token.split(".")[1]));
                    setTokenDecoded(decoded);
                  } catch {}
                }
              })
              .catch(() => {
                console.warn("[KeycloakProvider] Failed to refresh token, logging out");
                kc.logout();
              });
          }
        }, 20000);

        // cleanup interval on unmount
        return () => clearInterval(refreshInterval);
      })
      .catch((err) => {
        console.error("[KeycloakProvider] Keycloak init failed:", err);
      })
      .finally(() => setInitialized(true));
  }, []);

  const logout = () => {
    if (keycloak) {
      keycloak.logout({ redirectUri: window.location.origin });
    }
  };

  if (!initialized) return <div>Loading Keycloak...</div>;

  return (
    <KeycloakContext.Provider value={{ keycloak, authenticated, initialized, logout, tokenDecoded }}>
      {children}
      {authenticated && tokenDecoded && (
        <div style={{ position: "fixed", bottom: 10, right: 10}}>
        </div>
      )}
    </KeycloakContext.Provider>
  );
};
