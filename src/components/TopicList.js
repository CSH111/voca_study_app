import { useContext, useEffect, useState } from "react";
import useFetch from "../hook/useFetch";
import Loading from "./Loading";
import Topic from "./Topic";

const TopicList = ({ itemLoading }) => {
  const [loading, setLoading] = useState(true);

  const topics = useFetch(`http://localhost:3001/topics`, setLoading);
  //  setTopics 로 map 재실행하도록!!!!
  //   <---여기서
  // console.log(itemLoading);
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ul>
        {topics.map((topic) => (
          <Topic topic={topic} key={topic.id} />
        ))}
        {itemLoading ? <li>Loading...</li> : null}
      </ul>
    </>
  );
};

export default TopicList;

//억지로 셋 하지말고 받아온 데이터 topic을 set해서 자연스럽게 렌더링되도록
