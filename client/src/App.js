import { useEffect } from "react";
import { ThemeProvider } from "styled-components";

import { useAuthSeletor } from "./context";
import { useGetUser, useGetWordbook } from "./hooks";
import AppRouter from "./router";
import { GlobalStyles, theme } from "./styles";

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
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;

// TODO
//모바일 화면 페이퍼 패딩 줄이기
// eventListener clear 필요한지 점검
// 단어 사이즈 클 시 줄바꿈(words 페이지)
// word 스켈레톤 버그
// 리드미 연결 버튼

//기능 - 클라이언트
// 읽어주기 API
// 즐겨찾기 여부 바깥으로 빼기

//디자인

// 7. 데이터 통신상태 표시해주기 alert로 실패알리기 말고 성공이든 실패든 한곳에서 표시해주기// 통신 알림창 우하(or상)단에

// +(디테일 페이지에서도 볼수있게)
