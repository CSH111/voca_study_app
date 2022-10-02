import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    {/* <React.StrictMode> */}
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
    {/* </React.StrictMode> */}
  </>
);
