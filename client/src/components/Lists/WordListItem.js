import { useContext, useRef, useState } from "react";
import { WordsDataContext } from "../../context/WordsDataContext";
import makeNewContextData from "../../function/makeNewContextData";
import putData from "../../function/putData";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import Ellipsis from "../Ellipsis";
import Listitem from "./ListItem";
import InputBox from "../InputBox";
import axios from "axios";
import { useEffect } from "react";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
  const { words, setWords } = useContext(WordsDataContext);
  const [isModifying, setIsModifying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(word.isBookmarked);
  const [isMemorized, setIsMemorized] = useState(word.isMemorized);
  const [wordValue, setWordValue] = useState(word.word);
  const [meaningValue, setMeaningValue] = useState(word.meaning);
  const [loading, setLoading] = useState(false);
  const wordInputBox = useRef();

  const handleDelBtn = () => {
    if (!window.confirm("삭제할꺼?")) {
      return;
    }
    axios
      .delete(`/api/word/${word._id}`) //
      .then((res) => {
        setWords(words.filter((_word) => _word._id !== word._id));
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
        setWords(getModifiedWords(changedDataObj));
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

  const getModifiedWords = (changedDataObj) =>
    words.map((_word) => {
      if (_word._id === word._id) {
        return { ...word, ...changedDataObj };
      }
      return _word;
    });

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateWord({ word: wordValue, meaning: meaningValue });
    setLoading(false);
    setIsModifying(false);
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

  if (loading) {
    return <li>loading...</li>;
  }
  return (
    <Listitem>
      {isModifying ? (
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
          <button>완료</button>
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
      )}
      <Ellipsis
        items={
          <>
            <Button onClick={handleDelBtn}>
              <FontAwesomeIcon icon={["fas", "trash-alt"]} />
            </Button>
            <Button onClick={handleModifyingMode}>
              <FontAwesomeIcon icon={["fas", "edit"]} />
            </Button>
            <StyledButton
              onClick={handleBookmark}
              isBookmarked={isBookmarked}
              className="bookmark"
            >
              <FontAwesomeIcon icon={["fas", "star"]} />
            </StyledButton>
          </>
        }
      />
    </Listitem>
  );
}
