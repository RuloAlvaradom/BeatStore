import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { LoginProvider } from "./hooks/ContextLogin.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <LoginProvider>
      <App />
    </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);

