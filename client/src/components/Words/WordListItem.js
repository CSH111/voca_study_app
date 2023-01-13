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
  const { deleteWord, isLoading: isDeleteLoading, isError: isDeleteError } = useDeleteWord();
  const { patchWord, isLoading: isPatchLoading, isError: isPatchError } = usePatchWord();
  const { openModal, closeModal } = useModal();
  const [isModifying, setIsModifying] = useState(false);
  const wordInputElem = useRef();
  const meaningInputElem = useRef();

  const isItemLoading = isDeleteLoading || isPatchLoading;
  const handleDeleteModal = () => {
    // setIsDeleteModalOpened(true);
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

  const handleIsMemorized = async () => {
    patchWord(id, { ...wordData, isMemorized: !isMemorized });
  };

  const handleBookmark = async () => {
    patchWord(id, { ...wordData, isBookmarked: !isBookmarked });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setIsModifying(false);
    patchWord(id, {
      ...wordData,
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
    <StyledDataBox className="data" isMemorized={isMemorized} onClick={handleIsMemorized}>
      <div className="word"> {word}</div>
      <div className="meaning">{meaning}</div>
    </StyledDataBox>
  );

  return (
    <ListItem cursor="pointer">
      {isItemLoading && (
        <>
          <div className="blur-filter"></div>
          <div className="spinner">
            <Spinner />
          </div>
        </>
      )}
      {listItemContents}
      {/* <Button width="55px">zz</Button> */}
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
    </ListItem>
  );
};

export default WordListItem;

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
