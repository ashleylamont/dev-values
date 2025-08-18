import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DevValuesProvider } from "./data/contextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DevValuesProvider>
      <App />
    </DevValuesProvider>
  </StrictMode>,
);
