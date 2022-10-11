import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Reset } from "styled-reset";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Bookmark, Home, Login, Register, Topics, Words } from "./pages";
import MainLayout from "./components/layout/MainLayout";
import PrivateRoutes from "./routes/PrivateRoutes";
library.add(fas, far);

function App() {
  return (
    <BrowserRouter>
      <Reset />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:topic" element={<Words />} />
            <Route path="/bookmark" element={<Bookmark />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

//컨텍스트 로그아웃 시 데이터 삭제

//컨텍스트 분리 auth 컨텍스트 등
//토픽, 단어 추가 수정 등 폼 재구현(기획 필요)
// 토픽별 단어갯수 앱에서 최초 1회받아오기. => 이제 컨텍스트 있으니까 개편하게 구현가능
export default App;
