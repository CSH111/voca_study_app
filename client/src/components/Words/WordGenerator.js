import { useEffect, useRef, useState } from "react";

import { usePostWord } from "../../hooks";
import { Button, InputBox } from "../common";
import { AddIcon } from "../common/icons";
import * as S from "./styles";

const WordGenerator = ({ topicName, topicID, setNewItemLoading, lang }) => {
  const [wordInputValue, setWordInputValue] = useState("");
  const [meaningInputValue, setMeaningInputValue] = useState("");
  const wordInput = useRef();
  const meaningInput = useRef();
  const isEmptyWordValue = !wordInputValue.trim();
  const isEmptyMeaningValue = !meaningInputValue.trim();

  const { postWord, isLoading } = usePostWord();

  useEffect(() => {
    setNewItemLoading(isLoading);
  }, [isLoading]);

  const handleAddBtnClick = (e) => {
    e.preventDefault();
    if (isEmptyWordValue) return wordInput.current.focus();
    if (isEmptyMeaningValue) return meaningInput.current.focus();
    setMeaningInputValue("");
    setWordInputValue("");
    wordInput.current.focus();

    const body = {
      topic: topicName,
      topicID,
      lang,
      word: wordInputValue,
      meaning: meaningInputValue,
    };
    postWord(body);
  };

  return (
    <S.Form className="generator">
      <S.Controls>
        <S.InputContainer>
          <label htmlFor="wordInput">단어</label>
          <InputBox
            type="text"
            ref={wordInput}
            value={wordInputValue}
            onChange={(e) => setWordInputValue(e.target.value)}
          />
        </S.InputContainer>
        <S.InputContainer>
          <label htmlFor="meaningInput">뜻</label>
          <InputBox
            type="text"
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
