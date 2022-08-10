import { useContext, useRef, useState } from "react";
import { WordsDataContext } from "../../context/WordsDataContext";

const WordGenerator = ({ topic, setitemLoading }) => {
  const { setWords } = useContext(WordsDataContext);
  const [wordInputValue, setWordInputValue] = useState("");
  const [meaningInputValue, setMeaningInputValue] = useState("");
  const wordInput = useRef();
  const meaningInput = useRef();

  const handleAddBtnClick = (e) => {
    e.preventDefault();

    if (!wordInputValue) {
      wordInput.current.focus();
      return;
    }
    if (!meaningInputValue) {
      meaningInput.current.focus();
      return;
    }

    setitemLoading(true);
    const newWord = {
      topic: topic,
      eng: wordInputValue,
      kor: meaningInputValue,
      isDone: false,
    };
    [setMeaningInputValue, setWordInputValue].forEach((fn) => fn(""));
    fetch("http://localhost:3001/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    })
      .then((res) => res.url)
      .then((url) => fetch(`${url}?topic=${topic}`))
      .then((res) => res.json())
      .then((data) => {
        setitemLoading(false);
        setWords(data);
        wordInput.current.focus();
      });
  };
  return (
    <form action="">
      <label htmlFor="wordInput">단어</label>
      <input
        type="text"
        id="wordInput"
        ref={wordInput}
        value={wordInputValue}
        onChange={(e) => setWordInputValue(e.target.value)}
      />

      <label htmlFor="meaningInput">뜻</label>
      <input
        type="text"
        id="meaningInput"
        ref={meaningInput}
        value={meaningInputValue}
        onChange={(e) => setMeaningInputValue(e.target.value)}
      />

      <button onClick={handleAddBtnClick}>단어추가</button>
    </form>
  );
};

export default WordGenerator;