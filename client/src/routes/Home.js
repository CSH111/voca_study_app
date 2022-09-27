import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopicGenerator from "../components/Generator/TopicGenerator";
import TopicList from "../components/Lists/TopicList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Home({ setMsg, setIsLoggedIn }) {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/api/home`) //
      .then((res) => {
        setMsg(`${res.data.userInfo.name}'s Wordbook`);
        setIsLoggedIn(true);
        return;
      })
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  const [itemLoading, setItemLoading] = useState(false);

  return (
    <>
      <TopicGenerator setItemLoading={setItemLoading} />
      <Link to={"/bookmark"} className="toBookmark">
        <FontAwesomeIcon icon={["fas", "star"]} /> my bookmark
      </Link>
      <TopicList itemLoading={itemLoading} />
    </>
  );
}

export default Home;

// 할거

// 기능(서버)
// 6. 사용자 설정 테마
//가입전 테스터 계정이용기능

// 회원정보 변경 => 로그아웃이랑 같은 메뉴탭
//기능(클라이언트)
//2 읽어주기 API
// 4. 시험 기능 (카드넘기기)
// 모두삭제
// 체크삭제
// 주제 검색, 미리보기, 바로이동
// 스피너 만들고 로딩시 ㄱ

//폰트어썸 아이콘 임포트방식 수정
// 스타일드 컴포넌트 잘못 쓴거 수정
// 즐겨찾기 여부 바깥으로 빼기

//한번에 여러단어 추가 => 하나씩 추가하는 것보다 트래픽 상 이득일듯?

// 로딩중에 추가시 아이템 로딩 여러줄 뜰수 있게끔

//컨텍스트 없애고 데이터는 데이터대로 보낸뒤 클라이언트 단에서 따로 생성하는식으로 다시짜기....

//디자인
// 7. 데이터 통신상태 표시해주기 alert로 실패알리기 말고 성공이든 실패든 한곳에서 표시해주기// 통신 알림창 우하(or상)단에

// +(디테일 페이지에서도 볼수있게)
// - 토글버튼 통일(체크박스로 vs 버튼으로 )
// 스타일트 컴포넌트에 ref 주는 요령 기억하기 ref forwarding 테크닉. 나머지에도 적용하기
// 안보이는것에 포커스 할때 width랑 opacity이용하기 display none이면 포커스가 안먹는다 settimeout 0 가 더 좋은듯

//버그
// 잘못된 경로 알림 두번 뜨는이유????
