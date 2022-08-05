import { useContext, useState } from "react";
import { WordsDataContext } from "../context/WordsDataContext";

import Loading from "./Loading";

export function WordListItem({ word }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);
  const { words, setWords } = useContext(WordsDataContext);
  function handleDelBtn() {
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "DELETE",
    }).then(() => {
      setWords([...words].filter((item) => item.id !== word.id));
    });
  }
  function handleIsDone() {
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...word,
        isDone: !word.isDone,
      }),
    }).then((response) => {
      response.ok && setIsDone(!isDone);
    });
  }
  const modifyData = () => {
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...word,
        eng: wordValue,
        kor: meaningValue,
      }),
    }).then(() => {
      setIsModifying(false);
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

  // if (isDeleted) {
  //   return null;
  // }
  if (isModifying) {
    return (
      <tr>
        <td>
          <input type="text" value={wordValue} onChange={handleWordInput} />
        </td>
        <td>
          <input
            type="text"
            value={meaningValue}
            onChange={handleMeaningInput}
          />
        </td>
        <td>
          <button onClick={modifyData}>완료</button>
        </td>
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
          checked={isDone}
        />
      </td>
      <td>{word.eng}</td>
      <td>{word.kor}</td>
      <td>
        <button>뜻 숨기기</button>
      </td>
      <td>
        <button>북마크</button>
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
