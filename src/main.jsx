import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { KeycloakProvider } from "./components/KeycloakProvider";

createRoot(document.getElementById("root")).render(

    <KeycloakProvider>
      <App />
    </KeycloakProvider>

);
