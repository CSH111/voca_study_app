import { useEffect } from "react";

import AppRoutes from "./AppRoutes";
import { useAuthSeletor } from "./context";
import { useGetUser, useGetWordbook } from "./hooks";
import { useAxiosInterseptors } from "./services";

function App() {
  const { user } = useAuthSeletor();
  const getUser = useGetUser();
  const getWordbook = useGetWordbook();

  useAxiosInterseptors();

  useEffect(() => {
    if (!user) {
      getUser();
      return;
    }

    getWordbook();
  }, [user]);

  return <AppRoutes />;
}

export default App;

//TODO 토픽 경로 유효성검사 - context 이용하기
// TODO 언어 변경 기능
