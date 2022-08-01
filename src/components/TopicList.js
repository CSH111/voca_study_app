import { useEffect, useState } from "react";
import Topic from "./Topic";

const TopicList = function ({ updateState, onUpdate }) {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/topics")
      .then((response) => response.json())
      .then((data) => setTopics(data));
  }, [updateState]);
  return (
    <>
      <ul>
        {topics.map((topic) => (
          <Topic topic={topic} key={topic.id} onUpdate={onUpdate} />
        ))}
      </ul>
    </>
  );
};

export default TopicList;
