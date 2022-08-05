import { useContext, useRef } from "react";
import { WordsDataContext } from "../context/WordsDataContext";

const WordGenerator = ({ topic }) => {
  const { setWords } = useContext(WordsDataContext);
  const inputWord = useRef();
  const inputMeaning = useRef();
  function addWord(e) {
    e.preventDefault();
    const newWord = {
      topic: topic,
      eng: inputWord.current.value,
      kor: inputMeaning.current.value,
      isDone: false,
    };
    [inputWord, inputMeaning].forEach((elem) => (elem.current.value = ""));
    fetch("http://localhost:3001/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    })
      .then((res) => res.url)
      .then(fetch)
      .then((res) => res.json())
      .then(setWords);
  }
  return (
    <form action="">
      <label>
        단어
        <input type="text" ref={inputWord} />
      </label>
      <label>
        뜻
        <input type="text" ref={inputMeaning} />
      </label>
      <button onClick={addWord}>단어추가</button>
    </form>
  );
};

export default WordGenerator;
