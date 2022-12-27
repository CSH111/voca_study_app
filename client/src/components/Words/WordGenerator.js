import { useContext, useRef, useState } from "react";
import axios from "axios";
import { DataContext } from "../../services/DataContext";
import { Button, InputBox } from "../common";
import { AddIcon } from "../common/icons";

const WordGenerator = ({ topic, topicID, setwordItemLoading }) => {
  const store = useContext(DataContext);
  const [wordInputValue, setWordInputValue] = useState("");
  const [meaningInputValue, setMeaningInputValue] = useState("");
  const wordInput = useRef();
  const meaningInput = useRef();
  const isEmptyWordValue = !wordInputValue.trim();
  const isEmptyMeaningValue = !meaningInputValue.trim();

  const updateWord = () => {
    const body = {
      topic,
      topicID,
      word: wordInputValue,
      meaning: meaningInputValue,
      isMemorized: false,
      isBookmarked: false,
    };
    // 바디줄이기
    axios
      .post("/api/word", body) //
      .then((res) => {
        setwordItemLoading(false);
        // store.setWords(res.data.newWords);
        store.setWordsData((data) => ({ ...data, words: res.data.newWords }));
      })
      .catch(console.log);
  };

  const handleAddBtnClick = (e) => {
    e.preventDefault();
    if (isEmptyWordValue) return wordInput.current.focus();
    if (isEmptyMeaningValue) return meaningInput.current.focus();

    setwordItemLoading(true);
    setMeaningInputValue("");
    setWordInputValue("");
    wordInput.current.focus();

    updateWord();
  };

  return (
    <form action="">
      <label htmlFor="wordInput">단어</label>
      <InputBox
        type="text"
        id="wordInput"
        ref={wordInput}
        value={wordInputValue}
        onChange={(e) => setWordInputValue(e.target.value)}
      />

      <label htmlFor="meaningInput">뜻</label>
      <InputBox
        type="text"
        id="meaningInput"
        ref={meaningInput}
        value={meaningInputValue}
        onChange={(e) => setMeaningInputValue(e.target.value)}
      />

      <Button onClick={handleAddBtnClick}>
        <AddIcon />
      </Button>
    </form>
  );
};

export default WordGenerator;
