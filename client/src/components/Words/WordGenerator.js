import { useContext, useRef, useState } from "react";
import axios from "axios";
import { DataContext } from "../../services/DataContext";
import { Button, InputBox } from "../common";
import { AddIcon } from "../common/icons";
import styled from "styled-components";
import * as S from "./styles";

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
    <S.Form>
      <S.Controls>
        <S.InputContainer>
          <label htmlFor="wordInput">단어</label>
          <InputBox
            type="text"
            id="wordInput"
            ref={wordInput}
            value={wordInputValue}
            onChange={(e) => setWordInputValue(e.target.value)}
          />
        </S.InputContainer>
        <S.InputContainer>
          <label htmlFor="meaningInput">뜻</label>
          <InputBox
            type="text"
            id="meaningInput"
            ref={meaningInput}
            value={meaningInputValue}
            onChange={(e) => setMeaningInputValue(e.target.value)}
          />
        </S.InputContainer>
      </S.Controls>
      <Button onClick={handleAddBtnClick} width="35px" height="35px">
        <AddIcon />
      </Button>
    </S.Form>
  );
};

export default WordGenerator;

// const StyledForm = styled.form`
//   display: flex;
//   flex-wrap: wrap;
//   margin-bottom: 20px;
//   > *:not(:last-child) {
//     margin-right: 10px;
//   }
// `;

// const InputContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   label {
//     font-size: 12px;
//   }
// `;
