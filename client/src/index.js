import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WordBookProvider } from "./services/WordbookContext";
import { AuthContextProvider } from "./services/Auth/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    {/* <React.StrictMode> */}
    <AuthContextProvider>
      <WordBookProvider>
        <App />
      </WordBookProvider>
    </AuthContextProvider>
    {/* </React.StrictMode> */}
  </>
);
