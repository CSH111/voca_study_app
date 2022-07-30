import { useEffect, useState } from "react";

const TopicCreator = function ({ onUpdate }) {
  const [topicValue, setTopicValue] = useState("");
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
        alert("등록완료");
        setTopicValue("");
        onUpdate();
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
