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
import Login from "./components/User/Login";
import Register from "./components/User/Register";
library.add(fas, far, faArrowAltCircleLeft, faEllipsis, faStar, faEdit, faUndo);
const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 700px;
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  position: relative;
  background-color: #e1e2e1;
  form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .wrapper {
  }
`;

function App() {
  const [words, setWords] = useState([]);
  const [topics, setTopics] = useState([]);
  const [msg, setMsg] = useState("");
  return (
    <BrowserRouter>
      <Reset />
      <Wrapper className="wrapper">
        <Header msg={msg} />{" "}
        {/* 리프팅스테이트업으로 헤더에 들어갈 메세지(메인:~~님 환영, 디테일: 주제명) */}
        <Routes>
          <Route
            path="/"
            element={
              <TopicDataContext.Provider value={{ topics, setTopics }}>
                <Home setMsg={setMsg} />
              </TopicDataContext.Provider>
            }
          />
          <Route
            path="/:topic"
            element={
              <WordsDataContext.Provider value={{ words, setWords }}>
                <Detail setMsg={setMsg} />
              </WordsDataContext.Provider>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
