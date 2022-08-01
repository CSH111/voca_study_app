import { useState } from "react";
import { Link } from "react-router-dom";

const Topic = ({ topic, onUpdate }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModifying, setIsModifying] = useState(false);

  const deleteTopic = () => {
    return fetch(`http://localhost:3001/topics/${topic.id}`, {
      method: "DELETE",
    });
  };
  const deleteWords = () => {
    fetch(`http://localhost:3001/words?topic=${topic.topic}`)
      .then((response) => response.json())
      .then((words) => words.map((word) => word.id))
      .then((ids) => {
        ids.forEach((id) => {
          fetch(`http://localhost:3001/words/${id}`, {
            method: "DELETE",
          });
        });
      });
  };

  const onDeleteBtnCLick = () => {
    deleteTopic()
      .then(() => deleteWords())
      .then(() => {
        setIsDeleted(true);
      })
      .catch(() => alert("삭제실패"));
  };

  const [topicValue, setTopicValue] = useState(topic.topic);
  const handleTopicInput = (e) => {
    setTopicValue(e.target.value);
  };

  const modifyWords = () => {
    return fetch(`http://localhost:3001/words?topic=${topic.topic}`)
      .then((response) => response.json())
      .then((words) =>
        words.forEach((word) => {
          fetch(`http://localhost:3001/words/${word.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...word,
              topic: topicValue,
            }),
          });
        })
      );
  };
  const modifyTopic = () => {
    fetch(`http://localhost:3001/topics/${topic.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...topic,
        topic: topicValue,
      }),
    });
  };
  const modifyData = () => {
    modifyWords()
      .then(() => modifyTopic())
      .then(() => onUpdate())
      .then(() => setIsModifying(false));
  };
  if (isDeleted) {
    return null;
  }
  if (isModifying) {
    return (
      <li>
        <input type="text" value={topicValue} onChange={handleTopicInput} />
        <button onClick={modifyData}>완료</button>

        <div>5/10</div>
      </li>
    );
  }
  return (
    <li>
      <Link to={`/${topic.topic}`}>
        <h3>{topic.topic}</h3>
      </Link>
      <span>5/10</span>
      <button onClick={onDeleteBtnCLick}>토픽삭제</button>
      <button onClick={() => setIsModifying(true)}>수정</button>
    </li>
  );
};
export default Topic;
