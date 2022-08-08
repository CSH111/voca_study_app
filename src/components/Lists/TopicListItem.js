import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TopicDataContext } from "../../context/TopicDataContext";
import putData from "../../function/putData";
import makeNewContextData from "../../function/makeNewContextData";

const TopicListItem = ({ topic }) => {
  const [isModifying, setIsModifying] = useState(false);
  const [wordsAmount, setWordsAmount] = useState("");
  const [wordsDoneAmount, setWordsDoneAmount] = useState("");
  const { topics, setTopics } = useContext(TopicDataContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/words?topic=${topic.topic}`) //
      .then((response) => response.json())
      .then((data) => {
        setWordsAmount(data.length);
        setWordsDoneAmount(data.filter((word) => word.isDone).length);
      });
  }, []);

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
      .then(() => {
        const newTopics = topics.filter((item) => item.id !== topic.id);
        setTopics(newTopics);
        deleteWords();
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
          putData(`http://localhost:3001/words/${word.id}`, {
            ...word,
            topic: topicValue,
          });
        })
      );
  };
  const modifyTopic = () => {
    putData(`http://localhost:3001/topics/${topic.id}`, {
      ...topic,
      topic: topicValue,
    });
    const updatedTopics = makeNewContextData(topics, topic, {
      topic: topicValue,
    });
    setTopics(updatedTopics);
  };

  const onModifyBtnClick = () => {
    setIsModifying(false);
    setLoading(true);
    modifyWords()
      .then(() => modifyTopic())
      .then(() => setLoading(false));
  };

  if (isModifying) {
    return (
      <li>
        <input type="text" value={topicValue} onChange={handleTopicInput} />
        <button onClick={onModifyBtnClick}>완료</button>
      </li>
    );
  }
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <li>
      <Link to={`/${topic.topic}`}>
        <h3>{topic.topic}</h3>
      </Link>
      <span>
        {wordsDoneAmount}/{wordsAmount}
      </span>
      <button onClick={onDeleteBtnCLick}>토픽삭제</button>
      <button onClick={() => setIsModifying(true)}>수정</button>
    </li>
  );
};
export default TopicListItem;
