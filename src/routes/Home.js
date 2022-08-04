import { useState } from "react";
import TopicCreator from "../components/TopicCreator";
import TopicList from "../components/TopicList";

function Home() {
  const [itemLoading, setItemLoading] = useState(false);
  return (
    <>
      <TopicCreator itemLoading={itemLoading} setItemLoading={setItemLoading} />
      <TopicList itemLoading={itemLoading} />
    </>
  );
}

export default Home;

// 할거
// 3.fetch 최적화 가능?
// 4.시험 기능 (카드넘기기)
// 5.북마크
