import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
import { DataContext } from "../../services/DataContext";

import * as S from "./styles";
import { DeleteIcon, EditIcon, FolderIcon } from "../common/icons";
import styled from "styled-components";
import { useRef } from "react";
import axios from "axios";
import ListItem from "../../components/common/Lists/ListItem";
import { Button, Ellipsis, InputBox } from "../../components/common";
import { Spinner } from "../../components/common/icons";

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

  if (isDeleted) {
    return null;
  }
  return (
    <ListItem className="topic" isBlur={isItemLoading}>
      <S.Link to={`/topics/${topic.topicName}`}>
        <FolderIcon fontSize="25px" />
        <Center>
          {isItemLoading && (
            <>
              <div className="blur-filter"></div>
              <div className="spinner">
                <Spinner />
              </div>
            </>
          )}
          {/* {topicItemcontents} */}
          {isModifying ? (
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
            <StyledDiv>
              <h3>{topic.topicName}</h3>
              {/* <ProgressBar
      progress={
        wordsDoneAmount / wordsAmount !== NaN
          ? wordsDoneAmount / wordsAmount
          : 0
      }
      innerText={wordsAmount ? wordsDoneAmount + "/" + wordsAmount : null}
    /> */}
            </StyledDiv>
          )}
        </Center>
      </S.Link>

      <Ellipsis
        disabled={isItemLoading}
        items={
          <>
            <Button onClick={handleDelete} disabled={isItemLoading}>
              <DeleteIcon />
            </Button>
            <Button onClick={handleModificationMode} disabled={isItemLoading}>
              <EditIcon />
            </Button>
          </>
        }
      />
    </ListItem>
  );
};
export default TopicListItem;

// const StyledLink = styled(Link)`
//   display: flex;
//   align-items: center;
//   height: 100%;
//   flex: 1;
// `;

const Center = styled.div`
  /* flex: 1; */
  margin: 0 10px;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  h3 {
    margin-right: 0.5rem;
  }
`;
