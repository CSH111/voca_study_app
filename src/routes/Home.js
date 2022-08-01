import { useState } from "react";
import TopicCreator from "../components/TopicCreator";
import TopicList from "../components/TopicList";

function Home() {
  const [updateState, setUpdateState] = useState(false);
  const changeState = () => {
    setUpdateState(!updateState);
  };
  return (
    <>
      <TopicCreator onUpdate={changeState} />
      <TopicList updateState={updateState} onUpdate={changeState} />
    </>
  );
}

export default Home;

// 할거
// 1.topic이름,단어 수정기능
// 2.단어 몇개 인지 표시기능
// 3.fetch 최적화 가능?
// 4.시험 기능 (카드넘기기)
// 5.북마크
