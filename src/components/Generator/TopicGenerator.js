import { useContext, useRef, useState } from "react";
import { TopicDataContext } from "../../context/TopicDataContext";

const TopicGenerator = function ({ setItemLoading }) {
  const [topicValue, setTopicValue] = useState("");
  const { topics, setTopics } = useContext(TopicDataContext);
  const topicInput = useRef();

  const isExist = (inputValue) => {
    return topics.find((topic) => topic.topic === inputValue);
  };

  const createTopic = (e) => {
    e.preventDefault();
    if (!topicValue.trim()) {
      topicInput.current.focus();
      return;
    }

    if (isExist(topicValue)) {
      alert("이미 존재하는 이름입니다.");
      topicInput.current.focus();
      return;
    }
    setItemLoading(true);
    fetch("http://localhost:3001/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: topicValue }),
    })
      .then((res) => res.ok && res.url)
      .then(fetch)
      .then((res) => res.ok && res.json())
      .then((data) => {
        topicInput.current.focus();
        setItemLoading(false);
        setTopics(data);
        setTopicValue("");
      });
  };
  return (
    <>
      <form>
        <label>
          주제
          <input
            type="text"
            value={topicValue}
            onChange={(e) => setTopicValue(e.target.value)}
            ref={topicInput}
          />
        </label>

        <button onClick={createTopic}>생성</button>
      </form>
    </>
  );
};

export default TopicGenerator;