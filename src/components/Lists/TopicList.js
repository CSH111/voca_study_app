import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TopicDataContext } from "../../context/TopicDataContext";
import Loading from "../Loading";
import TopicListItem from "./TopicListItem";

const TopicList = ({ itemLoading }) => {
  const [loading, setLoading] = useState(true);
  const { topics, setTopics } = useContext(TopicDataContext);

  useEffect(() => {
    fetch(`http://localhost:3001/topics`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setTopics(data);
      });
  }, []);

  if (loading) {
    return <div>loading..</div>;
  }
  if (!topics.length && !itemLoading) {
    return <div>토픽을 추가하세요.</div>;
  }
  return (
    <>
      <ul>
        <li>
          <Link to={"/bookmark"}>북마크</Link>
        </li>
        {topics.map((topic) => (
          <TopicListItem topic={topic} key={topic.id} />
        ))}
        {itemLoading ? <li>Loading...</li> : null}
      </ul>
    </>
  );
};

export default TopicList;
