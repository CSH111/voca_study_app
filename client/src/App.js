import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Bookmark, Home, Login, Register, Topics, Words } from "./pages";
import MainLayout from "./components/layout/MainLayout";
import PrivateRoutes from "./routes/PrivateRoutes";
import { Reset } from "styled-reset";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <Router>
      <Reset />
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:topic" element={<Words />} />
            <Route path="/bookmark" element={<Bookmark />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

//컨텍스트 로그아웃 시 데이터 삭제

//컨텍스트 분리 auth 컨텍스트 등
//토픽, 단어 추가 수정 등 폼 재구현(기획 필요)
// 토픽별 단어갯수 앱에서 최초 1회받아오기. => 이제 컨텍스트 있으니까 개편하게 구현가능

// 리팩토링
// 커스텀폼 마저 적용시키기
// 컴포넌트에서 직접 api 통신하는거 service로 옮기기

// 할거

// 기능 - 서버
// 가입전 테스터 계정이용기능
// 회원정보 변경 => 로그아웃이랑 같은 메뉴탭

//기능 - 클라이언트
// 사용자 설정 테마
// 읽어주기 API
// 시험 기능 (카드넘기기)
// 모두삭제
// 체크삭제
// 주제 검색, 미리보기, 바로이동
// 즐겨찾기 여부 바깥으로 빼기
// 한번에 여러단어 추가 => 하나씩 추가하는 것보다 트래픽 상 이득일듯?

//디자인
// 모달
// 토픽추가버튼 우하단 원형버튼으로
//

// 7. 데이터 통신상태 표시해주기 alert로 실패알리기 말고 성공이든 실패든 한곳에서 표시해주기// 통신 알림창 우하(or상)단에

// +(디테일 페이지에서도 볼수있게)

// 안보이는것에 포커스 할때 width랑 opacity이용하기 display none이면 포커스가 안먹는다 settimeout 0 가 더 좋은듯
