import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { useState } from "react";
import { UpdateContext } from "./context/UpdateContext";

import Detail from "./routes/Detail";
import Home from "./routes/Home";

function App() {
  const [updateState, setUpdateState] = useState(false);

  return (
    <BrowserRouter>
      <Header />
      <UpdateContext.Provider value={{ updateState, setUpdateState }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:topic" element={<Detail />} />
        </Routes>
      </UpdateContext.Provider>
    </BrowserRouter>
  );
}

export default App;
