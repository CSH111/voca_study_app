import { useEffect, useState } from "react";
import Topic from "./Topic";

const TopicList = function () {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/topics")
      .then((response) => response.json())
      .then((data) => setTopics(data));
  }, []);
  return (
    <>
      <ul>
        {topics.map((topic) => (
          <li key={topic.id}>
            <Topic topic={topic} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default TopicList;
