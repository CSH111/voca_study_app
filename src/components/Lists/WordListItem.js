import { useContext, useState } from "react";
import { WordsDataContext } from "../../context/WordsDataContext";
import makeNewContextData from "../../function/makeNewContextData";
import putData from "../../function/putData";
import styled from "styled-components";
import Loading from "../Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const StyledTableData = styled.div`
  font-style: ${(props) => (props.isDone ? "italic" : "")};
  text-decoration: ${(props) => (props.isDone ? "line-through" : "")};
`;

export function WordListItem({ word }) {
  const [isModifying, setIsModifying] = useState(false);
  const { words, setWords } = useContext(WordsDataContext);
  const [loading, setLoading] = useState(false);
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
    putData(`http://localhost:3001/words/${word.id}`, {
      ...word,
      isDone: !word.isDone,
    }).then((res) => {
      if (!res.ok) {
        return;
      }
      const updatedWords = makeNewContextData(words, word, {
        isDone: !word.isDone,
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
      <tr>
        <td colSpan={6}>
          <input type="text" value={wordValue} onChange={handleWordInput} />
          <input
            type="text"
            value={meaningValue}
            onChange={handleMeaningInput}
          />
          <button onClick={modifyWord}>완료</button>
        </td>
      </tr>
    );
  }
  if (loading) {
    return (
      <tr>
        <td colSpan={6}>loading...</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          name=""
          id=""
          onChange={handleIsDone}
          checked={word.isDone}
        />
      </td>
      <StyledTableData isDone={word.isDone}>
        <td>{word.eng}</td>
        <td>{word.kor}</td>
      </StyledTableData>
      <td>
        <button>뜻 숨기기</button>
      </td>
      <td>
        <button>
          <FontAwesomeIcon icon={faStar} />
        </button>
      </td>
      <td>
        <button onClick={handleDelBtn}>삭제</button>
      </td>
      <td>
        <button onClick={() => setIsModifying(true)}>수정</button>
      </td>
    </tr>
  );
}
