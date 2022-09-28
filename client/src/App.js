import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import { useState, useEffect } from "react";
import { Reset } from "styled-reset";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import styled from "styled-components";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
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
  const [msg, setMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Reset />
      <Wrapper className="wrapper">
        <Header
          msg={msg}
          isLoggedIn={isLoggedIn}
          setMsg={setMsg}
          setIsLoggedIn={setIsLoggedIn}
        />{" "}
        <Routes>
          <Route
            path="/"
            element={<Home setMsg={setMsg} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/:topic" element={<Detail setMsg={setMsg} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

// 토픽별 단어갯수 앱에서 최초 1회받아오기.
export default App;
