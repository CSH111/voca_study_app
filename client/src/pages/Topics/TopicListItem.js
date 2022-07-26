import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../services/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProgressBar from "./ProgressBar";
import styled from "styled-components";
import { useRef } from "react";
import axios from "axios";
import Button from "../../components/common/Button";
import Ellipsis from "../../components/common/Ellipsis";
import ListItem from "../../components/common/Lists/ListItem";
import InputBox from "../../components/common/InputBox";
import Spinner from "../../components/common/Spinner";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  h3 {
    margin-right: 0.5rem;
  }
`;

const TopicListItem = ({ topic }) => {
  const { topicsData, setTopicsData, setWordsData } = useContext(DataContext);
  const [isModifying, setIsModifying] = useState(false);
  const [wordsAmount, setWordsAmount] = useState("");
  const [wordsDoneAmount, setWordsDoneAmount] = useState("");
  const [topicValue, setTopicValue] = useState(topic.topicName);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const modifyingValue = useRef();
  const [isDeleted, setIsDeleted] = useState(false);

  // 삭제 로딩 표시
  const handleDelete = () => {
    if (!window.confirm("삭제할꺼?")) {
      return;
    }
    axios
      .delete(`/api/topic/${topic._id}`, { data: { topic: topic.topicName } }) //
      .then((res) => {
        setIsDeleted(true);
      })
      .catch(console.log);
  };

  const handleTopicInput = (e) => {
    setTopicValue(e.target.value);
  };

  const handleModificationMode = () => {
    setIsModifying(true);
    setTimeout(() => {
      modifyingValue.current.focus();
    }, 0);
  };

  const getUpdatedTopics = (newTopicObject) => {
    return topicsData.topics.map((_topic) => {
      if (_topic._id === topic._id) {
        return { ...topic, ...newTopicObject };
      }
      return _topic;
    });
  };

  const updateTopic = () => {
    const body = { topicName: topicValue };
    return axios
      .patch(`/api/topic/${topic._id}`, body) //
      .then(() => {
        setWordsData((data) => {
          return {
            ...data,
            words: data.words.map((word) => {
              if (word.topic === topic.topicName) {
                return { ...word, topic: body.topicName };
              }
              return word;
            }),
          };
        });
        setTopicsData((data) => ({ ...data, topics: getUpdatedTopics(body) }));
      })
      .catch(console.log);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    setIsModifying(false);
    setIsItemLoading(true);
    updateTopic() //
      .finally(() => setIsItemLoading(false));
  };

  const topicItemcontents = isModifying ? (
    <form onSubmit={handleSubmission}>
      <InputBox
        type="text"
        value={topicValue}
        onChange={handleTopicInput}
        ref={modifyingValue}
      />
      <Button type="submit">끝</Button>
    </form>
  ) : (
    <StyledDiv isModifying={isModifying}>
      <h3>
        <Link to={`/topics/${topic.topicName}`}>{topic.topicName}</Link>
      </h3>
      {/* <ProgressBar
        progress={
          wordsDoneAmount / wordsAmount !== NaN
            ? wordsDoneAmount / wordsAmount
            : 0
        }
        innerText={wordsAmount ? wordsDoneAmount + "/" + wordsAmount : null}
      /> */}
    </StyledDiv>
  );

  if (isDeleted) {
    return null;
  }
  return (
    <ListItem className="topic" isBlur={isItemLoading}>
      {isItemLoading && (
        <>
          <div className="blur-filter"></div>
          <div className="spinner">
            <Spinner />
          </div>
        </>
      )}
      {topicItemcontents}
      <Ellipsis
        disabled={isItemLoading}
        items={
          <>
            <Button onClick={handleDelete} disabled={isItemLoading}>
              <FontAwesomeIcon icon="fa-solid fa-trash-can" />
            </Button>
            <Button onClick={handleModificationMode} disabled={isItemLoading}>
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
            </Button>
          </>
        }
      />
    </ListItem>
  );
};
export default TopicListItem;
