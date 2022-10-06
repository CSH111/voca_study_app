import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect } from "react";
import { DataContext } from "../../services/DataContext";

import Button from "../../components/common/Button";
import Ellipsis from "../../components/common/Ellipsis";
import ListItem from "../../components/common/Lists/ListItem";
import InputBox from "../../components/common/InputBox";
import Spinner from "../../components/common/Spinner";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  transition: all 0.2s;

  font-style: ${({ isMemorized }) => (isMemorized ? "italic" : "")};
  text-decoration: ${({ isMemorized }) =>
    isMemorized ? "line-through" : "none"};
  > div {
    text-align: center;
    padding-bottom: 0.1rem;
    margin-left: 0.5rem;
    min-width: 70px;
    border-bottom: solid #3c3c3c 1px;
  }
`;
const StyledButton = styled(Button)`
  color: ${({ isBookmarked }) => (isBookmarked ? "#ffcc11ff" : "#d7d7d7ff")};
`;

export function WordListItem({ wordID }) {
  const store = useContext(DataContext);
  const [isModifying, setIsModifying] = useState(false);
  const [word] = store.wordsData.words.filter((_word) => _word._id === wordID);
  const isBookmarked = word.isBookmarked;
  const isMemorized = word.isMemorized;
  const [wordValue, setWordValue] = useState(word.word);
  const [meaningValue, setMeaningValue] = useState(word.meaning);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const wordInputBox = useRef();

  // const setNewData

  const handleDelBtn = () => {
    if (!window.confirm("삭제할꺼?")) {
      return;
    }
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
    await updateWord({ word: wordValue, meaning: meaningValue }).catch(
      console.log
    );
    setIsItemLoading(false);
  };

  const handleWordInput = (e) => {
    setWordValue(e.target.value);
  };

  const handleMeaningInput = (e) => {
    setMeaningValue(e.target.value);
  };

  const handleModifyingMode = () => {
    setIsModifying(true);
  };

  useEffect(() => {
    if (isModifying) wordInputBox.current.focus();
  }, [isModifying]);

  const listItemContents = isModifying ? (
    <form onSubmit={handleSubmission} action="">
      <InputBox
        className="input"
        type="text"
        value={wordValue}
        onChange={handleWordInput}
        ref={wordInputBox}
      />
      <InputBox
        type="text"
        value={meaningValue}
        onChange={handleMeaningInput}
      />
      <Button type="submit">완료</Button>
    </form>
  ) : (
    <StyledDiv
      className="data"
      isMemorized={isMemorized}
      onClick={handleIsMemorized}
    >
      <div> {word.word}</div>

      <div>{word.meaning}</div>
    </StyledDiv>
  );
  return (
    <ListItem>
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
            <Button onClick={handleDelBtn}>
              <FontAwesomeIcon icon="fa-solid fa-trash-can" />
            </Button>
            <Button onClick={handleModifyingMode}>
              <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
            </Button>
            <StyledButton
              onClick={handleBookmark}
              isBookmarked={isBookmarked}
              className="bookmark"
            >
              <FontAwesomeIcon icon="fa-solid fa-star" />
            </StyledButton>
          </>
        }
      />
    </ListItem>
  );
}
