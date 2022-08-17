import { useState } from "react";
import TopicGenerator from "../components/Generator/TopicGenerator";
import TopicList from "../components/Lists/TopicList";

function Home() {
  const [itemLoading, setItemLoading] = useState(false);
  return (
    <>
      <TopicGenerator setItemLoading={setItemLoading} />
      <TopicList itemLoading={itemLoading} />
    </>
  );
}

export default Home;

// 할거

// 기능
//2 읽어주기 API
// 3. fetch 최적화 가능?
// 4. 시험 기능 (카드넘기기)
// 5. 북마크
// 6. 사용자 설정 테마
//11. 로그인5
// 토픽 별 프로그레스 바
// 모두삭제
// 체크삭제

//한번에 여러단어 추가 => 하나씩 추가하는 것보다 트래픽 상 이득일듯?
// 로딩중에 추가시 아이템 로딩 여러줄 뜰수 있게끔

//추가
//디자인

// 7. 데이터 통신상태 표시해주기 alert로 실패알리기 말고 성공이든 실패든 한곳에서 표시해주기
