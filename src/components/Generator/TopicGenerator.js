import { useContext, useRef, useState } from "react";
import { TopicDataContext } from "../../context/TopicDataContext";

const TopicGenerator = function ({ setItemLoading }) {
  const [topicValue, setTopicValue] = useState("");
  const { setTopics } = useContext(TopicDataContext);
  const topicInput = useRef();
  const createWords = (e) => {
    e.preventDefault();
    setItemLoading(true);

    topicValue.trim() &&
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
          setItemLoading(false);
          setTopics(data);
          setTopicValue("");
          topicInput.current.focus();
        });
  };
  return (
    <>
      <form onSubmit={createWords}>
        <label>
          주제
          <input
            type="text"
            value={topicValue}
            onChange={(e) => setTopicValue(e.target.value)}
            ref={topicInput}
          />
        </label>

        <button>생성</button>
      </form>
    </>
  );
};

export default TopicGenerator;
