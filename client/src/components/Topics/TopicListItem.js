import { useState } from "react";
import { useWordbookDispatch, useWordbookSelector } from "../../context/WordbookContext";
import * as S from "./styles";
import { CancelIcon, CheckIcon, DeleteIcon, EditIcon, FolderIcon } from "../common/icons";
import styled from "styled-components";
import { useRef } from "react";
import ListItem from "../../components/common/Lists/ListItem";
import { Button, DeleteModal, Ellipsis, InputBox } from "../../components/common";
import { Spinner } from "../../components/common/icons";
import ProgressBar from "./ProgressBar";

import LinkModal from "./LinkModal";
import { useDeleteTopic, usePatchTopic } from "../../hooks";
const TopicListItem = ({ topic }) => {
  const { words: allWords } = useWordbookSelector();
  const { deleteTopic, isLoading: isDeleteLoading, isDeleteError } = useDeleteTopic();
  const { patchTopic, isLoading: isPatchLoading, isError: isPatchError } = usePatchTopic();
  const [isModifying, setIsModifying] = useState(false);
  const fixInput = useRef();
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isLinkModalOpened, setIsLinkModalOpened] = useState(false);
  const wordsForThisTopic = allWords.filter((word) => word.topic === topic.topicName);
  const wordsAmount = wordsForThisTopic.length;
  const wordsDoneAmount = wordsForThisTopic.filter((word) => word.isMemorized === true).length;
  const isListItemLoading = isDeleteLoading || isPatchLoading;
  const isItemLoading = false;

  const handleDeleteModal = (e) => {
    setIsDeleteModalOpened(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpened(false);
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
    const topicName = fixInput.current.value.trim();
    if (topicName === "") return;
    setIsModifying(false);
    patchTopic(topic._id, { topicName });
  };

  const handleListClick = () => {
    setIsLinkModalOpened(true);
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
