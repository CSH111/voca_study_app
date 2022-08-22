import { useContext, useState } from "react";
import { WordsDataContext } from "../../context/WordsDataContext";
import makeNewContextData from "../../function/makeNewContextData";
import putData from "../../function/putData";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button";
import Ellipsis from "../Ellipsis";
import Listitem from "./ListItem";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  transition: all 0.2s;

  font-style: ${(props) => (props.isDone ? "italic" : "")};
  text-decoration: ${(props) => (props.isDone ? "line-through" : "")};
  &:hover {
    background-color: lightcoral;
    cursor: pointer;
  }
  > div {
    text-align: center;
    padding-bottom: 0.1rem;
    margin-left: 0.5rem;
    min-width: 70px;
    border-bottom: solid #3c3c3c 1px;
  }
`;

export function WordListItem({ word }) {
  const [checked, setChecked] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const { words, setWords } = useContext(WordsDataContext);
  const [loading, setLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  function handleDelBtn() {
    if (!window.confirm("삭제할꺼?")) {
      return;
    }
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "DELETE",
    }).then(() => {
      setWords(words.filter((item) => item.id !== word.id));
    });
  }
  function handleIsDone() {
    const updatedWords = makeNewContextData(words, word, {
      isDone: !word.isDone,
    });
    setWords(updatedWords);
    putData(`http://localhost:3001/words/${word.id}`, {
      ...word,
      isDone: !word.isDone,
    }).then((res) => {
      if (!res.ok) {
        const restoredWords = makeNewContextData(words, word, {
          isDone: word.isDone,
        });
        setWords(restoredWords);
      }
    });
  }
  function handleBookmark() {
    putData(`http://localhost:3001/words/${word.id}`, {
      ...word,
      isBookmarked: !word.isBookmarked,
    }).then((res) => {
      if (!res.ok) {
        return;
      }
      const updatedWords = makeNewContextData(words, word, {
        isBookmarked: !word.isBookmarked,
      });
      setWords(updatedWords);
    });
  }
  const modifyWord = () => {
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

  if (isModifying) {
    return (
      <li>
        <input type="text" value={wordValue} onChange={handleWordInput} />
        <input type="text" value={meaningValue} onChange={handleMeaningInput} />
        <button onClick={modifyWord}>완료</button>
      </li>
    );
  }
  if (loading) {
    return <li colSpan={6}>loading...</li>;
  }
  return (
    <Listitem>
      <StyledDiv className="data" isDone={word.isDone} onClick={handleIsDone}>
        <div> {word.eng}</div>

        <div>{word.kor}</div>
      </StyledDiv>
      <Ellipsis
        items={
          <>
            <Button onClick={handleDelBtn}>
              <FontAwesomeIcon icon={["fas", "trash-alt"]} />
            </Button>
            <Button onClick={() => setIsModifying(true)}>
              <FontAwesomeIcon icon={["fas", "edit"]} />
            </Button>
            <Button
              onClick={() => handleBookmark()}
              isBookmarked={word.isBookmarked}
              className="bookmark"
            >
              <FontAwesomeIcon icon={["fas", "star"]} />
            </Button>
          </>
        }
      />
    </Listitem>
  );
}
