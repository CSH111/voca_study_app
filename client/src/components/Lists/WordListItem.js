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

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  transition: all 0.2s;

  font-style: ${(props) => (props.isMemorized ? "italic" : "")};
  text-decoration: ${(props) => (props.isMemorized ? "line-through" : "")};
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
  const [isModifying, setIsModifying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(word.isBookmarked);
  const { words, setWords } = useContext(WordsDataContext);

  const [loading, setLoading] = useState(false);
  const wordInputBox = useRef();

  function handleDelBtn() {
    if (!window.confirm("삭제할꺼?")) {
      return;
    }
    axios
      .delete(`/api/word/${word._id}`) //
      .then((res) => {
        setWords(words.filter((_word) => _word._id !== word._id));
      });
  }
  function handleIsMemorized() {
    // console.log("zz");
    const body = { isMemorized: word.isMemorized, _id: word._id };
    axios
      .post("/api/data/word/update", body) //
      .then((res) => console.log(res.data))
      .catch(console.log);

    // const updatedWords = makeNewContextData(words, word, {
    //   isDone: !word.isDone,
    // });
    // setWords(updatedWords);
    // putData(`http://localhost:3001/words/${word.id}`, {
    //   ...word,
    //   isDone: !word.isDone,
    // }).then((res) => {
    //   if (!res.ok) {
    //     const restoredWords = makeNewContextData(words, word, {
    //       isDone: word.isDone,
    //     });
    //     setWords(restoredWords);
    //   }
    // });
  }
  function handleBookmark() {
    setIsBookmarked(!isBookmarked);
    putData(`http://localhost:3001/words/${word.id}`, {
      ...word,
      isBookmarked: !word.isBookmarked,
    })
      .then((res) => {
        const updatedWords = makeNewContextData(words, word, {
          isBookmarked: !word.isBookmarked,
        });
        setWords(updatedWords);
      })
      .catch((err) => {
        setIsBookmarked(isBookmarked);

        console.log(err);
      });
  }
  const modifyWord = (e) => {
    e.preventDefault();
    setIsModifying(false);
    setLoading(true);
    putData(`http://localhost:3001/words/${word.id}`, {
      ...word,
      eng: wordValue,
      kor: meaningValue,
    }).then((res) => {
      if (!res.ok) {
        alert("업로드 실패");
        return;
      }
      const updatedWords = makeNewContextData(words, word, {
        eng: wordValue,
        kor: meaningValue,
      });

      setWords(updatedWords);
      setLoading(false);
    });
  };
  const [wordValue, setWordValue] = useState(word.eng);
  const [meaningValue, setMeaningValue] = useState(word.kor);
  const handleWordInput = (e) => {
    setWordValue(e.target.value);
  };
  const handleMeaningInput = (e) => {
    setMeaningValue(e.target.value);
  };
  const goModifying = () => {
    setIsModifying(true);
    setTimeout(() => {
      wordInputBox.current.focus();
    }, 0);
  };
  if (loading) {
    return <li colSpan={6}>loading...</li>;
  }
  return (
    <Listitem>
      {isModifying ? (
        <form action="">
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
          <button onClick={modifyWord}>완료</button>
        </form>
      ) : (
        <StyledDiv
          className="data"
          isMemorized={word.isMemorized}
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
            <Button onClick={goModifying}>
              <FontAwesomeIcon icon={["fas", "edit"]} />
            </Button>
            <StyledButton
              onClick={() => handleBookmark()}
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
