import { useState } from "react";
import TopicGenerator from "../components/TopicGenerator";
import TopicList from "../components/TopicList";

function Home() {
  const [itemLoading, setItemLoading] = useState(false);
  return (
    <>
      <TopicGenerator
        itemLoading={itemLoading}
        setItemLoading={setItemLoading}
      />
      <TopicList itemLoading={itemLoading} />
    </>
  );
}

export default Home;

// 할거
// 3.fetch 최적화 가능?
// 4.시험 기능 (카드넘기기)
// 5.북마크
// 6. 사용자 설정 테마
// 7. 데이터 통신상태 표시해주기 alert로 실패알리기 말고 성공이든 실패든 한곳에서 표시해주기
//찾기 리액트 데이터 업로드 후 렌더링 어떤식으로 똑똑하게 하는지
