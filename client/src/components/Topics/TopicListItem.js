import { useRef, useState } from "react";
import styled from "styled-components";

import { Button, DeleteModal, Ellipsis, InputBox, ListItem } from "../../components/common";
import { useModal, useWordbookSelector } from "../../context";
import { useDeleteTopic, usePatchTopic } from "../../hooks";
import { CancelIcon, CheckIcon, DeleteIcon, EditIcon, FolderIcon, Spinner } from "../common/icons";
import { LinkModal, ProgressBar } from "./";
import * as S from "./styles";

const TopicListItem = ({ topic }) => {
  const { words: allWords } = useWordbookSelector();
  const { deleteTopic, isLoading: isDeleteLoading, isDeleteError } = useDeleteTopic();
  const { patchTopic, isLoading: isPatchLoading, isError: isPatchError } = usePatchTopic();
  const [isModifying, setIsModifying] = useState(false);
  const fixInput = useRef();
  const wordsForThisTopic = allWords.filter((word) => word.topic === topic.topicName);
  const wordsAmount = wordsForThisTopic.length;
  const wordsDoneAmount = wordsForThisTopic.filter((word) => word.isMemorized === true).length;
  const isListItemLoading = isDeleteLoading || isPatchLoading;
  const isItemLoading = false;
  const { openModal, closeModal } = useModal();
  const handleDeleteModal = (e) => {
    openModal(
      <DeleteModal
        title={topic.topicName}
        msg="폴더 내부의 모든 단어가 삭제됩니다. 정말 삭제 하시겠습니까?"
        handleDelete={handleDelete}
      />
    );
  };

  const handleDelete = () => {
    closeModal();
    deleteTopic(topic._id);
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

  const handleSubmission = async (e) => {
    e.preventDefault();
    const newTopicName = fixInput.current.value.trim();
    if (newTopicName === "") return;
    setIsModifying(false);
    patchTopic(topic._id, { topicName: newTopicName });
  };

  const handleListClick = () => {
    openModal(
      <LinkModal
        leftLink={`/test/${topic.topicName}`}
        rightLink={`/topics/${topic.topicName}`}
        title={topic.topicName}
      />
    );
  };

  return (
    <ListItem isBlur={isListItemLoading} onClick={handleListClick}>
      {isListItemLoading && (
        <>
          <div className="blur-filter"></div>
          <div className="spinner">
            <Spinner />
          </div>
        </>
      )}
      <S.ListContainer>
        <FolderIcon fontSize="25px" />
        <div className="topic-data">
          <div>({wordsAmount})</div>
          {isModifying ? (
            <>
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
            </>
          ) : (
            <>
              <h3>{topic.topicName}</h3>
              <ProgressBar show={wordsAmount > 0} progress={wordsDoneAmount / wordsAmount} />
            </>
          )}
        </div>
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
    </ListItem>
  );
};
export default TopicListItem;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
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
