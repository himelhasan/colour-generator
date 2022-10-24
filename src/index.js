import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./Context/AuthProvider/AuthProvider";
import "./styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />{" "}
    </AuthProvider>
  </React.StrictMode>
);
