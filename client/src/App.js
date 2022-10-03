import {
  Routes,
  BrowserRouter,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import { useState, useEffect } from "react";
import { Reset } from "styled-reset";
import Words from "./pages/Words";
import Topics from "./pages/Topics";
import styled from "styled-components";
import Login from "./pages/Login";
import Bookmark from "./pages/Bookmark";
import Register from "./pages/Register";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Home from "./pages/Home";
import axios from "axios";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";
library.add(fas, far);

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
  /* background-color: red; */
`;

function App() {
  const store = useContext(DataContext);

  // user data가져오기
  useEffect(() => {
    axios
      .get(`/api/user`) //
      .then((res) => {
        store.setUserName(res.data.userName);
        store.setIsLoggedIn(true);
        return;
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    axios
      .get("/api/topic") //
      .then((res) => {
        store.setTopics(res.data.topics);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    axios
      .get("/api/word") //
      .then((res) => store.setWords(res.data.words))
      .catch(console.log);
  }, []);

  return (
    // <BrowserRouter>
    <>
      <Reset />
      <Wrapper className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookmark" element={<Bookmark />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topic" element={<Words />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Wrapper>
    </>
    // </BrowserRouter>
  );
}
//패스 수정 /topics/:topic으로 그러면 bookmark 인지 처리 할 필요도 x 일듯?
// 토픽별 단어갯수 앱에서 최초 1회받아오기.
export default App;
