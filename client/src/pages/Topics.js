import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopicGenerator from "../components/Topics/TopicGenerator";
import TopicList from "../components/Topics/TopicList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

function Topics({}) {
  const navigate = useNavigate();
  const store = useContext(DataContext);

  // useEffect(() => {
  //   axios
  //     .get(`/api/user`) //
  //     .then((res) => {
  //       console.log(res.data);
  //       setMsg(`${res.data.userName}'s Wordbook`);
  //       setIsLoggedIn(true);
  //       return;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       navigate("/login");
  //     });
  // }, []);

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

export default Topics;

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

// 즐겨찾기 여부 바깥으로 빼기

//한번에 여러단어 추가 => 하나씩 추가하는 것보다 트래픽 상 이득일듯?

//디자인

// 모달
// 토픽추가버튼 우하단 원형버튼으로
//

// 7. 데이터 통신상태 표시해주기 alert로 실패알리기 말고 성공이든 실패든 한곳에서 표시해주기// 통신 알림창 우하(or상)단에

// +(디테일 페이지에서도 볼수있게)

// 안보이는것에 포커스 할때 width랑 opacity이용하기 display none이면 포커스가 안먹는다 settimeout 0 가 더 좋은듯
