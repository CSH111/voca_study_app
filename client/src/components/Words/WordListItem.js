import { useRef, useState } from "react";
import styled from "styled-components";

import {
  BookmarkButton,
  Button,
  DeleteModal,
  Ellipsis,
  InputBox,
  ListItem,
} from "../../components/common";
import { useModal } from "../../context";
import { useDeleteWord, usePatchWord } from "../../hooks";
import { CancelIcon, CheckIcon, DeleteIcon, EditIcon, Spinner, StarIcon } from "../common/icons";
import * as S from "./styles";

const WordListItem = ({ wordData }) => {
  const { isBookmarked, isMemorized, word, meaning, _id: id } = wordData;
  const { deleteWord, isLoading: isDeleteLoading } = useDeleteWord();
  const { patchWord, isLoading: isPatchLoading } = usePatchWord();
  const { openModal, closeModal } = useModal();
  const [isModifying, setIsModifying] = useState(false);
  const wordInputElem = useRef();
  const meaningInputElem = useRef();
  const isItemLoading = isDeleteLoading || isPatchLoading;

  const handleDeleteModal = () => {
    openModal(
      <DeleteModal
        handleDelete={handleDelete}
        msg="삭제한 단어는 복구할 수 없습니다. 정말로 삭제하시겠습니까?"
      />
    );
  };

  const handleDelete = () => {
    closeModal();
    deleteWord(id);
  };

  const handleIsMemorized = () => {
    patchWord(id, { isMemorized: !isMemorized });
  };

  const handleBookmark = () => {
    patchWord(id, { isBookmarked: !isBookmarked });
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    setIsModifying(false);
    patchWord(id, {
      word: wordInputElem.current.value,
      meaning: meaningInputElem.current.value,
    });
  };

  const handleFixModeOpen = () => {
    setIsModifying(true);
    setTimeout(() => {
      wordInputElem.current.focus();
      wordInputElem.current.value = word;
      meaningInputElem.current.value = meaning;
    }, 0);
  };

  const handleFixModeClose = () => {
    setIsModifying(false);
  };

  const listItemContents = isModifying ? (
    <S.Form onSubmit={handleSubmission} action="" columnOnSmallDevice={true}>
      <S.Controls>
        <S.InputContainer>
          <InputBox type="text" ref={wordInputElem} />
        </S.InputContainer>
        <S.InputContainer>
          <InputBox type="text" ref={meaningInputElem} />
        </S.InputContainer>
      </S.Controls>
      <StyledButtonsBox>
        <Button type="submit" themeColor="success" width="35px" height="35px">
          <CheckIcon />
        </Button>
        <Button type="button" width="35px" height="35px" onClick={handleFixModeClose}>
          <CancelIcon />
        </Button>
      </StyledButtonsBox>
    </S.Form>
  ) : (
    <StyledDataBox className="data-box" isMemorized={isMemorized} onClick={handleIsMemorized}>
      <div className="word"> {word}</div>
      <div className="meaning">{meaning}</div>
    </StyledDataBox>
  );

  return (
    <StyledListItem cursor="pointer">
      {isItemLoading && (
        <>
          <div className="blur-filter"></div>
          <div className="spinner">
            <Spinner />
          </div>
        </>
      )}
      {listItemContents}
      <Ellipsis
        items={
          <>
            <Button onClick={handleDeleteModal} themeColor="error" angleBorder>
              <DeleteIcon />
            </Button>
            <Button onClick={handleFixModeOpen} angleBorder>
              <EditIcon />
            </Button>
            <BookmarkButton onClick={handleBookmark} isBookmarked={isBookmarked} angleBorder>
              <StarIcon />
            </BookmarkButton>
          </>
        }
      />
    </StyledListItem>
  );
};

export default WordListItem;

const StyledListItem = styled(ListItem)`
  min-height: auto;
  > div {
    min-height: 70px;
  }
`;

const StyledDataBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-self: stretch;
  align-items: flex-start;
  width: 100%;
  transition: all 0.2s;

  font-style: ${({ isMemorized }) => (isMemorized ? "italic" : "")};
  text-decoration: ${({ isMemorized }) => (isMemorized ? "line-through" : "none")};

  overflow: hidden;
  > div {
    text-align: center;
    padding-bottom: 0.1rem;
    margin-left: 0.5rem;
    min-width: 70px;
    border-bottom: solid #3c3c3c 1px;
  }
`;

const StyledButtonsBox = styled.div`
  display: flex;
`;
