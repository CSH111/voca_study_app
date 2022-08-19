import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { useState } from "react";
import { Reset } from "styled-reset";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import { WordsDataContext } from "./context/WordsDataContext";
import { TopicDataContext } from "./context/TopicDataContext";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #efefef;
  height: 100%;
  min-height: 100vh;
  width: 30%;
  min-width: 300px;
  margin: 0 auto;
  padding: 10px;
`;
function App() {
  const [words, setWords] = useState([]);
  const [topics, setTopics] = useState([]);

  return (
    <BrowserRouter>
      <Reset />
      <Wrapper>
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
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
