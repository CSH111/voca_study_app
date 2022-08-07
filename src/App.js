import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { useState } from "react";
// import { UpdateContext } from "./context/UpdateContext";

import Detail from "./routes/Detail";
import Home from "./routes/Home";
import { WordsDataContext } from "./context/WordsDataContext";
import { TopicDataContext } from "./context/TopicDataContext";
function App() {
  const [words, setWords] = useState([]);
  const [topics, setTopics] = useState([]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <TopicDataContext.Provider value={{ topics, setTopics }}>
              <Home />
            </TopicDataContext.Provider>
          }
        />
        <Route
          path="/:topic"
          element={
            <WordsDataContext.Provider value={{ words, setWords }}>
              <Detail />
            </WordsDataContext.Provider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
