import { useState } from "react";
import { Link } from "react-router-dom";

const Topic = ({ topic }) => {
  const [isDeleted, setIsDeleted] = useState(false);
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

  if (isDeleted) {
    return null;
  }
  return (
    <li>
      <Link to={`/${topic.topic}`}>
        <div>
          <h3>{topic.topic}</h3> <span>5/10</span>
        </div>
      </Link>
      <button onClick={onDeleteBtnCLick}>토픽삭제</button>
    </li>
  );
};
export default Topic;
