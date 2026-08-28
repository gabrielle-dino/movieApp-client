import { StrictMode, createElement } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import { UserProvider } from "./context/UserContext.js";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  createElement(StrictMode, null,
    createElement(BrowserRouter, null,
      createElement(UserProvider, null,
        createElement(App)
      )
    )
  )
);