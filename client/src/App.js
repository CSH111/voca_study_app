import { Routes, BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Spinner from "./components/Spinner";
import { useState } from "react";
import { Reset } from "styled-reset";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import styled from "styled-components";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far, faArrowAltCircleLeft } from "@fortawesome/free-regular-svg-icons";
// prettier-ignore
import {fas, faEllipsis, faStar, faEdit, faUndo, faCircle, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
// prettier-ignore
library.add(fas, far, faArrowAltCircleLeft, faEllipsis, faStar, faEdit, faUndo, faCircleNotch, faCircle);
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

export default App;
