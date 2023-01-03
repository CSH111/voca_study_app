import "./App.css";
import AppRouter from "./router";
import { AuthContextProvider, WordbookProvider } from "./context";

//TODO: 모든 페이지컴포넌트에서 페이지컨테이너 반복사용중.. 해결하기
//TODO: 모달 컴포넌트 전역상태 및 글로벌컴포넌트로 개선하기
//TODO: 세로 스크롤 생길때 가로도 살짝 생김. 버그수정
//TODO: 모달 position fixed로 ㄱㄱ
function App() {
  return (
    <AuthContextProvider>
      <WordbookProvider>
        <AppRouter />;
      </WordbookProvider>
    </AuthContextProvider>
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
