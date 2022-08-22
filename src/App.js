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
//fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
// // import {} from "@fortawesome/free-solid-svg-icons";
import {
  faEllipsis,
  faStar,
  faEdit,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far, faArrowAltCircleLeft, faEllipsis, faStar, faEdit, faUndo);
const Wrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-width: 300px;
  position: relative;
  background-color: #e1e2e1;
  height: 100%;
  min-height: 80vh;
  /* padding: 0 1rem 1rem 1rem; */
  header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 1.25rem;
    font-size: 0.7rem;
    background-color: #9f90b6;
    top: 0;
    right: 0;
    color: white;
    padding: 0.1rem;
  }
  .wrapper {
  }
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
