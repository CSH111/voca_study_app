import { useContext, useEffect, useState } from "react";
import { UpdateContext } from "../context/UpdateContext";

const TopicCreator = function () {
  const [topicValue, setTopicValue] = useState("");
  const { updateState, setUpdateState } = useContext(UpdateContext);
  const createWords = (e) => {
    e.preventDefault();
    topicValue.trim() &&
      fetch("http://localhost:3001/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topicValue }),
      }).then(() => {
        setTopicValue("");
        setUpdateState(!updateState);
      });
  };
  return (
    <form>
      <label>
        주제
        <input
          type="text"
          value={topicValue}
          onChange={(e) => setTopicValue(e.target.value)}
        />
      </label>

      <button onClick={createWords}>생성</button>
    </form>
  );
};

export default TopicCreator;
