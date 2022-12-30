import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { DataContext } from "../../services/DataContext";
import * as S from "./styles";

import { StarIcon, EditIcon, DeleteIcon, CheckIcon, CancelIcon } from "../common/icons";
import ListItem from "../../components/common/Lists/ListItem";
import { InputBox, Ellipsis, Button, DeleteModal, ModalPortal } from "../../components/common";
import { Spinner } from "../common/icons";

const WordListItem = ({ wordID }) => {
  const store = useContext(DataContext);
  const [isModifying, setIsModifying] = useState(false);
  const [word] = store.wordsData.words.filter((_word) => _word._id === wordID);
  const isBookmarked = word.isBookmarked;
  const isMemorized = word.isMemorized;
  const [wordValue, setWordValue] = useState(word.word);
  const [meaningValue, setMeaningValue] = useState(word.meaning);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const wordInputBox = useRef();
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const handleDeleteModal = () => {
    setIsDeleteModalOpened(true);
  };
  const handleDelete = () => {
    setIsDeleteLoading(true);
    setIsDeleteModalOpened(false);
    axios
      .delete(`/api/word/${word._id}`) //
      .then((res) => {
        // store.setWords((words) => {
        store.setWordsData((data) => {
          return {
            ...data,
            words: data.words.filter((_word) => _word._id !== word._id),
          };
        });
      })
      .finally(() => {
        setIsDeleteLoading(false);
      });
  };

  const handleIsMemorized = async () => {
    setIsItemLoading(true);
    await updateWord({ isMemorized: !isMemorized }) //
      .catch(console.log);
    setIsItemLoading(false);
  };

  const handleBookmark = async () => {
    setIsItemLoading(true);
    await updateWord({ isBookmarked: !isBookmarked }) //
      .catch(console.log);
    setIsItemLoading(false);
  };

  const updateWord = (changedDataObj) => {
    const body = {
      ...word,
      ...changedDataObj,
    };
    return axios
      .patch(`/api/word/${word._id}`, body) //
      .then(() => {
        store.setWordsData((data) => ({
          ...data,
          words: getModifiedWords(body),
        }));
      });
  };

  const getModifiedWords = (newWord) =>
    store.wordsData.words.map((_word) => {
      if (_word._id === word._id) {
        return newWord;
      }
      return _word;
    });

  const handleSubmission = async (e) => {
    e.preventDefault();
    setIsItemLoading(true);
    setIsModifying(false);
    await updateWord({ word: wordValue, meaning: meaningValue }).catch(console.log);
    setIsItemLoading(false);
  };

  const handleWordInput = (e) => {
    setWordValue(e.target.value);
  };

  const handleMeaningInput = (e) => {
    setMeaningValue(e.target.value);
  };

  const handleFixModeOpen = () => {
    setIsModifying(true);
  };

  const handleFixModeClose = () => {
    setIsModifying(false);
    setWordValue(word.word);
  };

  useEffect(() => {
    if (isModifying) wordInputBox.current.focus();
  }, [isModifying]);

  const listItemContents = isModifying ? (
    <S.Form onSubmit={handleSubmission} action="" columnOnSmallDevice={true}>
      <S.Controls>
        <S.InputContainer>
          <InputBox
            className="input"
            type="text"
            value={wordValue}
            onChange={handleWordInput}
            ref={wordInputBox}
          />
        </S.InputContainer>
        <S.InputContainer>
          <InputBox type="text" value={meaningValue} onChange={handleMeaningInput} />
        </S.InputContainer>
      </S.Controls>
      <StyledButtonsBox>
        <Button type="submit" color="green" width="35px" height="35px">
          <CheckIcon />
        </Button>
        <Button type="button" width="35px" height="35px" onClick={handleFixModeClose}>
          <CancelIcon />
        </Button>
      </StyledButtonsBox>
    </S.Form>
  ) : (
    <StyledDiv className="data" isMemorized={isMemorized} onClick={handleIsMemorized}>
      <div className="word"> {word.word}</div>

      <div className="meaning">{word.meaning}</div>
    </StyledDiv>
  );

  return (
    <ListItem cursor="pointer">
      {(isItemLoading || isDeleteLoading) && (
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
            <Button onClick={handleDeleteModal} color="red">
              <DeleteIcon />
            </Button>
            <Button onClick={handleFixModeOpen}>
              <EditIcon />
            </Button>
            <StyledButton onClick={handleBookmark} isBookmarked={isBookmarked} className="bookmark">
              <StarIcon />
            </StyledButton>
          </>
        }
      />
      <ModalPortal>
        <DeleteModal
          handleDelete={handleDelete}
          setIsOpen={setIsDeleteModalOpened}
          isOpen={isDeleteModalOpened}
          msg="삭제한 단어는 복구할 수 없습니다. 정말로 삭제하시겠습니까?"
          isLoading={isDeleteLoading}
        />
      </ModalPortal>
    </ListItem>
  );
};

export default WordListItem;

const StyledDiv = styled.div`
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
    /* overflow: auto; */
  }
`;

const StyledButtonsBox = styled.div`
  display: flex;
`;
const StyledButton = styled(Button)`
  color: ${({ isBookmarked }) => (isBookmarked ? "#ffcc11ff" : "#d7d7d7ff")};
`;
