import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FormProvider } from "./context/FormContext";
import "./main.css"; // Tailwind entry
import "./styles/global.css"; // Custom reusable styles
import "./App.css"; // App-level styles


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <FormProvider>
        <App />
      </FormProvider>
    </BrowserRouter>
  </React.StrictMode>
);
