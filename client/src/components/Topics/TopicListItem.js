import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
import { DataContext } from "../../services/DataContext";

import * as S from "./styles";
import { CancelIcon, CheckIcon, DeleteIcon, EditIcon, FolderIcon } from "../common/icons";
import styled from "styled-components";
import { useRef } from "react";
import axios from "axios";
import ListItem from "../../components/common/Lists/ListItem";
import { Button, DeleteModal, Ellipsis, InputBox, ModalPortal } from "../../components/common";
import { Spinner } from "../../components/common/icons";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";
// import Modal from "../common/Modal";

const TopicListItem = ({ topic }) => {
  const { topicsData, setTopicsData, wordsData, setWordsData } = useContext(DataContext);
  const [isModifying, setIsModifying] = useState(false);
  const [topicValue, setTopicValue] = useState(topic.topicName);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const fixInput = useRef();
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const wordsForThisTopic = wordsData.words.filter((word) => word.topic === topic.topicName);
  const wordsAmount = wordsForThisTopic.length;
  const wordsDoneAmount = wordsForThisTopic.filter((word) => word.isMemorized === true).length;
  const navigate = useNavigate();
  // 삭제후 같은이름 추가(및 뒤로가기 시 버그)

  const handleDeleteModal = (e) => {
    setIsDeleteModalOpened(true);
  };

  // console.log(topicsData.topics.filter);
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

  const handleTopicInput = (e) => {};

  const handleFixModeOpen = (e) => {
    setIsModifying(true);
    console.log(topic.topicName);
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
    console.log("submit");
    setIsModifying(false);
    setIsItemLoading(true);
    updateTopic(fixInput.current.value) //
      .finally(() => setIsItemLoading(false));
  };

  const handleListClick = () => {
    navigate(`/topics/${topic.topicName}`);
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
      {/* <S.Link to={isModifying ? "#" : `/topics/${topic.topicName}`}> */}
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
                <Button onClick={handleFixModeClose} height="35px" width="35px" margin="0 0 0 5px">
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
      {/* </S.Link> */}

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
      <ModalPortal>
        <DeleteModal
          msg="폴더 내부의 모든 단어가 삭제됩니다. 정말 삭제 하시겠습니까?"
          handleDelete={handleDelete}
          isOpen={isDeleteModalOpened}
          setIsOpen={setIsDeleteModalOpened}
          isLoading={isDeleteLoading}
        />
      </ModalPortal>
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
