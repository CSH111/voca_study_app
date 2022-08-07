import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopicDataContext } from "../context/TopicDataContext";

const TopicGenerator = function ({ itemLoading, setItemLoading }) {
  const [topicValue, setTopicValue] = useState("");
  const { topics, setTopics } = useContext(TopicDataContext);
  const createWords = (e) => {
    e.preventDefault();
    setItemLoading(true);
    setTopicValue("");
    topicValue.trim() &&
      fetch("http://localhost:3001/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topicValue }),
      })
        .then((res) => res.url)
        .then(fetch)
        .then((res) => res.json())
        .then(setTopics);
    // fetch("http://localhost:3001/topics", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ topic: topicValue }),
    // })
    //   .then((res) => {
    //     setTopicValue("");
    //     setItemLoading(false);

    //     console.log(res);
    //     return res.url;
    //   })
    //   .then(fetch)
    //   .then((res) => res.json())
    //   .then(console.log);
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
          />
        </label>

        <button>생성</button>
      </form>
    </>
  );
};

export default TopicGenerator;
