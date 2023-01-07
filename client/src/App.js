import "./App.css";
import AppRouter from "./router";
import { AuthContextProvider, WordbookProvider } from "./context";
//TODO: simple import sort 설치 및 적용
function App() {
  return (
    <AuthContextProvider>
      <WordbookProvider>
        {/* <ModalProvider> */}
        <AppRouter />
        {/* </ModalProvider> */}
      </WordbookProvider>
    </AuthContextProvider>
  );
}

export default App;

// TODO
//컨텍스트 로그아웃 시 데이터 삭제

// 리팩토링

// 할거

//기능 - 클라이언트
// 사용자 설정 테마
// 읽어주기 API
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
