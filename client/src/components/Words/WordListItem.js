import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import Ellipsis from "../common/Ellipsis";
import ListItem from "../common/Lists/ListItem";
import InputBox from "../common/InputBox";
import axios from "axios";
import { useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import Spinner from "../common/Spinner";

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

export function WordListItem({ word }) {
  const store = useContext(DataContext);
  const [isModifying, setIsModifying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(word.isBookmarked);
  const [isMemorized, setIsMemorized] = useState(word.isMemorized);
  const [wordValue, setWordValue] = useState(word.word);
  const [meaningValue, setMeaningValue] = useState(word.meaning);
  const [isItemLoading, setIsItemLoading] = useState(false);
  const wordInputBox = useRef();

  const handleDelBtn = () => {
    if (!window.confirm("삭제할꺼?")) {
      return;
    }
    axios
      .delete(`/api/word/${word._id}`) //
      .then((res) => {
        store.setWords((words) => {
          return words.filter((_word) => _word._id !== word._id);
        });
      });
  };

  const handleIsMemorized = () => {
    setIsMemorized(!isMemorized);
    updateWord({ isMemorized: !isMemorized }) //
      .catch((err) => {
        console.log(err);
        setIsMemorized(isMemorized);
      });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    updateWord({ isBookmarked: !isBookmarked }) //
      .catch((err) => {
        console.log(err);
        setIsBookmarked(isBookmarked);
      });
  };

  const updateWord = (changedDataObj) => {
    const body = {
      ...word,
      ...changedDataObj,
    };
    return axios
      .patch(`/api/word/${word._id}`, body) //
      .then(() => {
        store.setWords(getModifiedWords(changedDataObj));
      });
  };

  const getModifiedWords = (changedDataObj) =>
    store.words.map((_word) => {
      if (_word._id === word._id) {
        return { ...word, ...changedDataObj };
      }
      return _word;
    });

  const handleSubmission = async (e) => {
    e.preventDefault();
    setIsItemLoading(true);
    setIsModifying(false);
    await updateWord({ word: wordValue, meaning: meaningValue });
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
