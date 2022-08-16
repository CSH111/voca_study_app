import { useContext, useRef, useState } from "react";
import { TopicDataContext } from "../../context/TopicDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

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
    if (topicValue === "bookmark") {
      alert("사용할 수 없는 이름입니다.");
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

        <Button onClick={createTopic}>
          <FontAwesomeIcon icon={faPlus} />{" "}
        </Button>
      </form>
    </>
  );
};

export default TopicGenerator;
