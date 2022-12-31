import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
import { DataContext } from "../../services/DataContext";

import * as S from "./styles";
import { CancelIcon, CheckIcon, DeleteIcon, EditIcon, FolderIcon } from "../common/icons";
import styled from "styled-components";
import { useRef } from "react";
import axios from "axios";
import ListItem from "../../components/common/Lists/ListItem";
import { Button, DeleteModal, Ellipsis, InputBox } from "../../components/common";
import { Spinner } from "../../components/common/icons";
import ProgressBar from "./ProgressBar";

import LinkModal from "./LinkModal";
// import Modal from "../common/Modal";
//TODO: topic 삭제시 컨텍스트반영ㄱ(삭제후 같은이름 생성시 버그)
const TopicListItem = ({ topic }) => {
  const { topicsData, setTopicsData, wordsData, setWordsData } = useContext(DataContext);
  const [isModifying, setIsModifying] = useState(false);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const fixInput = useRef();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isLinkModalOpened, setIsLinkModalOpened] = useState(false);
  const wordsForThisTopic = wordsData.words.filter((word) => word.topic === topic.topicName);
  const wordsAmount = wordsForThisTopic.length;
  const wordsDoneAmount = wordsForThisTopic.filter((word) => word.isMemorized === true).length;

  // 삭제후 같은이름 추가(및 뒤로가기 시 버그)

  const handleDeleteModal = (e) => {
    setIsDeleteModalOpened(true);
  };

  const handleDelete = () => {
    const _topics = topicsData.topics.filter(({ topicName }) => topicName !== topic.topicName);

    setIsDeleteLoading(true);
    setIsDeleteModalOpened(false);
    axios
      .delete(`/api/topic/${topic._id}`, { data: { topic: topic.topicName } }) //
      .then((res) => {
        setIsDeleteLoading(false);
        setTopicsData((data) => ({ ...data, topics: [..._topics] }));
      })
      .catch(console.log);
  };

  const handleFixModeOpen = (e) => {
    setIsModifying(true);
    setTimeout(() => {
      fixInput.current.focus();
      fixInput.current.value = topic.topicName;
    }, 0);
  };

  const handleFixModeClose = () => {
    setIsModifying(false);
  };

  const getUpdatedTopics = (newTopicObject) => {
    return topicsData.topics.map((_topic) => {
      if (_topic._id === topic._id) {
        return { ...topic, ...newTopicObject };
      }
      return _topic;
    });
  };

  const updateTopic = (value) => {
    const body = { topicName: value };
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
    const inputValue = fixInput.current.value;
    if (inputValue === "") return;
    setIsModifying(false);
    setIsItemLoading(true);
    updateTopic(fixInput.current.value) //
      .finally(() => setIsItemLoading(false));
  };

  const handleListClick = () => {
    setIsLinkModalOpened(true);
  };

  return (
    <ListItem isBlur={isItemLoading} onClick={handleListClick}>
      {(isItemLoading || isDeleteLoading) && (
        <>
          <div className="blur-filter"></div>
          <div className="spinner">
            <Spinner />
          </div>
        </>
      )}
      <S.ListContainer>
        <FolderIcon fontSize="25px" />
        <StyledCenter>
          {isModifying ? (
            <StyledForm>
              <InputBox type="text" ref={fixInput} />
              <StyledButtonsBox className="btnBox">
                <Button
                  type="submit"
                  onClick={handleSubmission}
                  height="35px"
                  width="35px"
                  margin="0 0 0 5px"
                  color="green"
                >
                  <CheckIcon />
                </Button>
                <Button
                  type="button"
                  onClick={handleFixModeClose}
                  height="35px"
                  width="35px"
                  margin="0 0 0 5px"
                >
                  <CancelIcon />
                </Button>
              </StyledButtonsBox>
            </StyledForm>
          ) : (
            <StyledDiv>
              <div>({wordsAmount})</div>
              <h3>{topic.topicName}</h3>
              <ProgressBar show={wordsAmount > 0} progress={wordsDoneAmount / wordsAmount} />
            </StyledDiv>
          )}
        </StyledCenter>
      </S.ListContainer>

      <Ellipsis
        disabled={isItemLoading}
        items={
          <>
            <Button onClick={handleDeleteModal} disabled={isItemLoading} color="red">
              <DeleteIcon />
            </Button>
            <Button onClick={handleFixModeOpen} disabled={isItemLoading}>
              <EditIcon />
            </Button>
          </>
        }
      />
      <DeleteModal
        msg="폴더 내부의 모든 단어가 삭제됩니다. 정말 삭제 하시겠습니까?"
        handleDelete={handleDelete}
        isOpen={isDeleteModalOpened}
        setIsOpen={setIsDeleteModalOpened}
        isLoading={isDeleteLoading}
      />
      <LinkModal
        isOpen={isLinkModalOpened}
        setIsOpen={setIsLinkModalOpened}
        leftLink={`/test/${topic.topicName}`}
        rightLink={`/topics/${topic.topicName}`}
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

  > *:not(:last-child) {
    margin-right: 10px;
  }

  h3 {
    display: inline;
    word-break: break-all;
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
