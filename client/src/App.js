import { Routes, BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import { useEffect, useContext } from "react";
import { Reset } from "styled-reset";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { DataContext } from "./context/DataContext";
import styled from "styled-components";
import { Bookmark, Home, Login, Register, Topics, Words } from "./pages";

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
`;

function App() {
  const store = useContext(DataContext);

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
    if (store.isLoggedIn) {
      getTopics();
      getWords();
    }
  }, [store.isLoggedIn]);

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
    </BrowserRouter>
  );
}
//패스 수정 /topics/:topic으로 그러면 bookmark 인지 처리 할 필요도 x 일듯?
// 토픽별 단어갯수 앱에서 최초 1회받아오기. => 이제 컨텍스트 있으니까 개편하게 구현가능
// context data 수정 => 로딩재구현
export default App;
