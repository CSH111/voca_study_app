import TopicCreator from "../components/TopicCreator";
import TopicList from "../components/TopicList";

function Home() {
  return (
    <>
      <TopicCreator />
      <TopicList />
    </>
  );
}

export default Home;

//할거 컴포넌트간 state공유 방법 공부
//creator 에서 topic list로 넘겨줘서 렌더링 시키도록
