import { useEffect } from "react";

import { GlobalStyles } from "./components/styles";
import { useAuthSeletor } from "./context";
import { useGetUser, useGetWordbook } from "./hooks";
import AppRouter from "./router";

function App() {
  const { user } = useAuthSeletor();
  const getUser = useGetUser();
  const getWordbook = useGetWordbook();

  useEffect(() => {
    if (!user) {
      getUser();
      return;
    }
    getWordbook();
  }, [user]);

  return (
    <>
      <GlobalStyles />
      <AppRouter />
    </>
  );
}

export default App;

// TODO
// 컨텍스트 로그아웃 시 데이터 삭제

// 리팩토링

// 할거

//기능 - 클라이언트
// 읽어주기 API
// 즐겨찾기 여부 바깥으로 빼기

//디자인

// 7. 데이터 통신상태 표시해주기 alert로 실패알리기 말고 성공이든 실패든 한곳에서 표시해주기// 통신 알림창 우하(or상)단에

// +(디테일 페이지에서도 볼수있게)
