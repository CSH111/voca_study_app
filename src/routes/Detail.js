import { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { WordList } from "../components/WordList";

function Detail() {
  const { topic } = useParams();
  const inputWord = useRef();
  const inputMeaning = useRef();

  // const { updateState, setUpdateState } = useContext(LoadingContext);

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
    });
  }
  return (
    <>
      <h2>{topic}</h2>
      <form action="">
        <label htmlFor="inputWord">단어</label>
        <input type="text" id="inputWord" ref={inputWord} />
        <label htmlFor="inputMeaning">뜻</label>
        <input type="text" id="inputMeaning" ref={inputMeaning} />
        <button onClick={addWord}>단어추가</button>
      </form>
      <hr />
      <WordList topic={topic} />
    </>
  );
}

export default Detail;
