import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { useModal } from "../../context";
import { usePatchWord } from "../../hooks";
import { speak } from "../../utils";
import { BookmarkButton, Button, Devider, Modal } from "../common";
import { SoundIcon, Spinner, StarIcon } from "../common/icons";
import StudyRestult from "./StudyResult";

const StudyItemBox = ({ currentIdx, goNext, setStaticWords, staticWordsInConcept }) => {
  const navigate = useNavigate();
  const { topic } = useParams();
  const { openModal } = useModal();
  const { patchWord, isLoading } = usePatchWord();
  const currentWord = staticWordsInConcept[currentIdx];
  const wordsAmount = staticWordsInConcept.length;
  const { word, meaning, isBookmarked, _id: id, lang } = currentWord ?? {};
  const [isAnswerShown, setIsAnswerShown] = useState(false);
  const [studyResult, setStudyResult] = useState({ complete: 0, incomplete: 0 });
  useEffect(() => {
    if (!wordsAmount) navigate(`/test/${topic}`);
  }, []);

  useEffect(() => {
    setIsAnswerShown(false);
  }, [currentIdx]);

  useEffect(() => {
    if (!wordsAmount) return;
    const studyEnd = currentIdx === wordsAmount;
    if (studyEnd) showEndModal();
  }, [currentIdx, wordsAmount]);

  const handleAnswerBtn = () => {
    setIsAnswerShown((state) => !state);
  };

  const handleEvaluation = async ({ target: { value } }) => {
    setStudyResult((resultObj) => ({
      ...resultObj,
      [JSON.parse(value) ? "complete" : "incomplete"]:
        resultObj[JSON.parse(value) ? "complete" : "incomplete"] + 1,
    }));
    await patchWord(id, { ...currentWord, isMemorized: JSON.parse(value) });
    goNext();
  };

  const handleSoundBtnClick = () => {
    speak(word, lang);
  };

  const handleBookmark = async () => {
    patchWord(id, { ...currentWord, isBookmarked: !currentWord.isBookmarked });
    setStaticWords((words) => {
      return words.map((word) => {
        return word._id === id ? { ...word, isBookmarked: !word.isBookmarked } : word;
      });
    });
  };

  const handleEndModalClose = () => {
    navigate(`/test/${topic}`);
  };

  const showEndModal = () => {
    openModal(
      <Modal onClose={handleEndModalClose} title={"학습종료"}>
        <StudyRestult>
          <div className="total">학습한 단어: {staticWordsInConcept.length}</div>
          <Devider margin={"5px 0"} />
          <div className="complete">외운 단어: {studyResult.complete}</div>
          <div className="incomplete">못 외운 단어: {studyResult.incomplete}</div>
        </StudyRestult>
      </Modal>
    );
  };

  return (
    <StyledBox>
      {isLoading && <StyledSpinner />}
      <StyledBookmarkBtn onClick={handleBookmark} isBookmarked={isBookmarked}>
        <StarIcon />
      </StyledBookmarkBtn>
      <StyledSoundBtn onClick={handleSoundBtnClick}>
        <SoundIcon />
      </StyledSoundBtn>
      {isAnswerShown && (
        <StyledEvaluateBtnsBox>
          <Button
            themeColor="success"
            onClick={handleEvaluation}
            value="true"
            shadow={true}
            variant="contained"
          >
            쉬움
            <br />
            (학습완료)
          </Button>
          <Button
            themeColor="error"
            onClick={handleEvaluation}
            value="false"
            shadow={true}
            variant="contained"
          >
            어려움
            <br />
            (추가학습)
          </Button>
        </StyledEvaluateBtnsBox>
      )}
      <StyledWord>{isAnswerShown ? meaning : word}</StyledWord>
      <StyledToggleBtn
        onClick={handleAnswerBtn}
        themeColor="primary"
        variant="contained"
        shadow={true}
      >
        {isAnswerShown ? "단어 보기" : "정답 확인"}
      </StyledToggleBtn>
      <StyledIdxBox>
        {currentIdx + 1 > wordsAmount ? wordsAmount : currentIdx + 1} / {wordsAmount}
      </StyledIdxBox>
    </StyledBox>
  );
};

export default StudyItemBox;

const StyledBox = styled.div`
  border-radius: 15px;
  box-shadow: inset 0 0 5px ${(p) => p.theme.color.shadow.main};
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  overflow: hidden;
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  left: 0;
  top: 0;
  margin: 20px;
  font-size: 20px;
`;

const StyledBookmarkBtn = styled(BookmarkButton)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 15px;
`;

const StyledSoundBtn = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
  margin: 15px;
`;

const StyledToggleBtn = styled(Button)`
  position: absolute;
  font-size: 16px;
  bottom: 0;
  margin: 20px;
`;

const StyledWord = styled.div`
  font-size: 30px;
`;

const StyledIdxBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 20px;
`;

const StyledEvaluateBtnsBox = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  margin: 15px;
  button {
    font-size: 16px;
    &:first-child {
      margin-right: 5px;
    }
  }
`;
