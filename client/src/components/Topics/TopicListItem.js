import { useRef, useState } from "react";
import styled, { css } from "styled-components";

import { Button, DeleteModal, Ellipsis, InputBox, ListItem } from "../../components/common";
import { useModal, useWordbookSelector } from "../../context";
import { useDeleteTopic, usePatchTopic } from "../../hooks";
import {
  CancelIcon,
  CheckIcon,
  DeleteIcon,
  EditIcon,
  FolderIcon,
  LangIcon,
  Spinner,
} from "../common/icons";
import { LinkModal, ProgressBar } from "./";
import LangChangeModal from "./LangChangeModal";

const TopicListItem = ({ topic }) => {
  const { words: allWords } = useWordbookSelector();
  const { deleteTopic, isLoading: isDeleteLoading } = useDeleteTopic();
  const { patchTopic, isLoading: isPatchLoading } = usePatchTopic();
  const { openModal, closeModal } = useModal();
  const [isModifying, setIsModifying] = useState(false);
  const fixInput = useRef();
  const wordsForThisTopic = allWords.filter((word) => word.topic === topic.topicName);
  const wordsAmount = wordsForThisTopic.length;
  const wordsDoneAmount = wordsForThisTopic.filter((word) => word.isMemorized === true).length;
  const isListItemLoading = isDeleteLoading || isPatchLoading;

  const handleDeleteModal = () => {
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

  const handleFixModeOpen = () => {
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
        leftLink={`/study/${topic.topicName}`}
        rightLink={`/topics/${topic.topicName}`}
        title={topic.topicName}
        wordsAmount={wordsAmount}
      />
    );
  };

  const handleLangBtnClick = () => {
    openModal(
      <LangChangeModal
        title={`읽기언어 변경 - ${topic.topicName}`}
        topicData={topic}
        patchTopic={patchTopic}
      />
    );
  };

  return (
    <StyledListItem isBlur={isListItemLoading} onClick={handleListClick}>
      {isListItemLoading && (
        <>
          <div className="blur-filter"></div>
          <div className="spinner">
            <Spinner />
          </div>
        </>
      )}
      <FolderIcon fontSize="25px" className="folder-icon" />
      <div>({wordsAmount})</div>
      {isModifying ? (
        <>
          <StyledForm>
            <InputBox type="text" ref={fixInput} />
            <StyledButtonsBox>
              <Button
                type="submit"
                onClick={handleSubmission}
                height="35px"
                width="35px"
                margin="0 0 0 5px"
                themeColor="success"
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
          <div className="progress-area">
            {wordsAmount > 0 && (
              <ProgressBar show={wordsAmount > 0} progress={wordsDoneAmount / wordsAmount} />
            )}
          </div>
        </>
      )}

      <Ellipsis
        disabled={isListItemLoading}
        items={
          <>
            <Button
              onClick={handleDeleteModal}
              disabled={isListItemLoading}
              themeColor="error"
              angleBorder
            >
              <DeleteIcon />
            </Button>
            <Button onClick={handleFixModeOpen} disabled={isListItemLoading} angleBorder>
              <EditIcon />
            </Button>
            <Button onClick={handleLangBtnClick} disabled={isListItemLoading} angleBorder>
              <LangIcon />
            </Button>
          </>
        }
      />
    </StyledListItem>
  );
};
export default TopicListItem;

const StyledListItem = styled(ListItem)`
  .progress-area {
    flex: 1;
    margin-left: 5px;
  }

  .folder-icon {
    margin: 0 10px;
  }

  h3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  ${(p) =>
    p.forBookmark &&
    css`
      justify-content: flex-start;
    `}
`;

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledButtonsBox = styled.div`
  display: flex;
`;
