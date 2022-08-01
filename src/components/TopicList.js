import { useContext, useEffect, useState } from "react";
import { UpdateContext } from "../context/UpdateContext";
import Topic from "./Topic";

const TopicList = function () {
  const [topics, setTopics] = useState([]);
  const { updateState } = useContext(UpdateContext);

  useEffect(() => {
    fetch("http://localhost:3001/topics")
      .then((response) => response.json())
      .then((data) => setTopics(data));
  }, [updateState]);
  return (
    <>
      <ul>
        {topics.map((topic) => (
          <Topic topic={topic} key={topic.id} />
        ))}
      </ul>
    </>
  );
};

export default TopicList;
