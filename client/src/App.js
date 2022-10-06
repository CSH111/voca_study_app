import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import { useEffect, useContext } from "react";
import { Reset } from "styled-reset";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { DataContext } from "./services/DataContext";
import styled from "styled-components";
import { Bookmark, Home, Login, Register, Topics, Words } from "./pages";
import MainLayout from "./components/layout/MainLayout";
import AuthContext from "./services/Auth/AuthContext";
import useAuthContext from "./services/Auth/useAuthContext";
library.add(fas, far);

function App() {
  const store = useContext(DataContext);
  const { isLoggedIn, setIsLoggedIn, setUserName } = useAuthContext();

  useEffect(() => {
    axios
      .get(`/api/user`) //
      .then((res) => {
        // store.setUserName(res.data.userName);
        // store.setIsLoggedIn(true);
        setUserName(res.data.userName);
        setIsLoggedIn(true);

        return;
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getTopics();
      getWords();
    }
  }, [isLoggedIn]);

  const getTopics = () => {
    axios
      .get("/api/topic") //
      .then((res) => {
        store.setTopicsData({ topics: res.data.topics, loading: false });
      })
      .catch(console.log);
  };

  const getWords = () => {
    axios
      .get("/api/word") //
      .then((res) => {
        store.setWordsData({ words: res.data.words, loading: false });
      })
      .catch(console.log);
  };

  return (
    <BrowserRouter>
      <Reset />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topic" element={<Words />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

//컨텍스트 분리 auth 컨텍스트 등
//토픽, 단어 추가 수정 등 폼 재구현(기획 필요)
// 토픽별 단어갯수 앱에서 최초 1회받아오기. => 이제 컨텍스트 있으니까 개편하게 구현가능
export default App;
