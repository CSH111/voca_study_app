import { useContext, useEffect, useState } from "react";
import { TopicDataContext } from "../context/TopicDataContext";
import useFetch from "../hook/useFetch";
import Loading from "./Loading";
import TopicListItem from "./TopicListItem";

const TopicList = ({ itemLoading }) => {
  // const [loading, setLoading] = useState(true);
  const { topics, setTopics } = useContext(TopicDataContext);

  useEffect(() => {
    fetch(`http://localhost:3001/topics`)
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
      });
  }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <>
      <ul>
        {topics.map((topic) => (
          <TopicListItem topic={topic} key={topic.id} />
        ))}
        {itemLoading ? <li>Loading...</li> : null}
      </ul>
    </>
  );
};

export default TopicList;

//억지로 셋 하지말고 받아온 데이터 topic을 set해서 자연스럽게 렌더링되도록
