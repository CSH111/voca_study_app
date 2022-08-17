import { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { WordsDataContext } from "../../context/WordsDataContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";

const WordGenerator = ({ topic, setitemLoading }) => {
  const { setWords } = useContext(WordsDataContext);
  const [wordInputValue, setWordInputValue] = useState("");
  const [meaningInputValue, setMeaningInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const wordInput = useRef();
  const meaningInput = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/topics")
      .then((res) => res.json())
      .then((topics) => {
        if (!topics.find((_topic) => _topic.topic === topic)) {
          alert("잘못된 경로");
          navigate("/");
          return;
        }
        setIsDisabled(false);
      });
  }, []);

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
    //
    wordInput.current.focus();

    setitemLoading(true);
    const newWord = {
      topic: topic,
      eng: wordInputValue,
      kor: meaningInputValue,
      isDone: false,
      isBookmarked: false,
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
        // wordInput.current.focus();
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

      <Button onClick={handleAddBtnClick} disabled={isDisabled}>
        <FontAwesomeIcon icon={faPlus} />{" "}
      </Button>
    </form>
  );
};

export default WordGenerator;
