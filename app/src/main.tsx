import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider accessToken={localStorage.getItem('accessToken') || undefined} refreshToken={localStorage.getItem('refreshToken') || undefined}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
