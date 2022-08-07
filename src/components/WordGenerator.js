import { useContext, useRef } from "react";
import { WordsDataContext } from "../context/WordsDataContext";

const WordGenerator = ({ topic }) => {
  const { setWords } = useContext(WordsDataContext);
  // const [wordInputValue, setWordInputValue] = useState("");
  // const [meaningInputValue, setMeaningInputValue] = useState(second);
  const wordInput = useRef();
  const meaningInput = useRef();
  const addWord = (e) => {
    e.preventDefault();
    const newWord = {
      topic: topic,
      eng: wordInput.current.value,
      kor: meaningInput.current.value,
      isDone: false,
    };
    [wordInput, meaningInput].forEach((input) => (input.current.value = ""));
    fetch("http://localhost:3001/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWord),
    })
      .then((res) => res.url)
      .then((data) => fetch(`${data}?topic=${topic}`))
      .then((res) => res.json())
      .then(setWords);
  };
  return (
    <form action="">
      <label>
        단어
        <input type="text" ref={wordInput} />
      </label>
      1
      <label>
        뜻
        <input type="text" ref={meaningInput} />
      </label>
      <button onClick={addWord}>단어추가</button>
    </form>
  );
};

export default WordGenerator;
