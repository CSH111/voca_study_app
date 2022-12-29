import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
import { DataContext } from "../../services/DataContext";

import * as S from "./styles";
import { CancelIcon, CheckIcon, DeleteIcon, EditIcon, FolderIcon } from "../common/icons";
import styled from "styled-components";
import { useRef } from "react";
import axios from "axios";
import ListItem from "../../components/common/Lists/ListItem";
import { Button, Ellipsis, InputBox } from "../../components/common";
import { Spinner } from "../../components/common/icons";
//TODO 앞,뒤 공백 제거 후 생성요청보내기
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

  const handleFixModeOpen = () => {
    setIsModifying(true);
    setTimeout(() => {
      modifyingValue.current.focus();
    }, 0);
  };

  const handleFixModeClose = () => {
    setIsModifying(false);
    setTopicValue(topic.topicName);
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
    console.log("hi");
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
      {isItemLoading && (
        <>
          <div className="blur-filter"></div>
          <div className="spinner">
            <Spinner />
          </div>
        </>
      )}
      <S.Link to={isModifying ? "#" : `/topics/${topic.topicName}`}>
        <FolderIcon fontSize="25px" />
        <StyledCenter>
          {isModifying ? (
            <StyledForm>
              <InputBox
                type="text"
                value={topicValue}
                onChange={handleTopicInput}
                ref={modifyingValue}
              />
              <StyledButtonsBox className="btnBox">
                <Button
                  onClick={handleSubmission}
                  height="35px"
                  width="35px"
                  margin="0 0 0 5px"
                  color="green"
                >
                  <CheckIcon />
                </Button>
                <Button onClick={handleFixModeClose} height="35px" width="35px" margin="0 0 0 5px">
                  <CancelIcon />
                </Button>
              </StyledButtonsBox>
            </StyledForm>
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
        </StyledCenter>
      </S.Link>

      <Ellipsis
        disabled={isItemLoading}
        items={
          <>
            <Button onClick={handleDelete} disabled={isItemLoading}>
              <DeleteIcon />
            </Button>
            <Button onClick={handleFixModeOpen} disabled={isItemLoading}>
              <EditIcon />
            </Button>
          </>
        }
      />
    </ListItem>
  );
};
export default TopicListItem;

const StyledCenter = styled.div`
  margin: 0 10px;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  h3 {
    margin-right: 0.5rem;
  }
`;

const StyledForm = styled.form`
  display: flex;
  @media (max-width: 500px) {
    flex-direction: column;
    .btnBox {
      align-self: flex-end;
    }
  }
`;

const StyledButtonsBox = styled.div`
  display: flex;
`;
