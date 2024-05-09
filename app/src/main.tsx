import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./app";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider
      accessToken={localStorage.getItem("accessToken") || undefined}
      refreshToken={localStorage.getItem("refreshToken") || undefined}
    >
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
);
