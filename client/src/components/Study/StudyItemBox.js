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
    <StyledBox className="box----">
      <StyledBoxTop>
        <Button className="sound-btn" onClick={handleSoundBtnClick}>
          <SoundIcon />
        </Button>
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
        <BookmarkButton onClick={handleBookmark} isBookmarked={isBookmarked}>
          <StarIcon />
        </BookmarkButton>
      </StyledBoxTop>

      <StyledWord>{isAnswerShown ? meaning : word}</StyledWord>
      <StyledBottomBox>
        <StyledSpinnerBox>{isLoading && <StyledSpinner />}</StyledSpinnerBox>
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
      </StyledBottomBox>
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
  justify-content: space-between;
  flex-direction: column;
  padding: 15px;
  overflow: hidden;
`;

const StyledBoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  .sound-btn {
  }
  ${BookmarkButton} {
  }
`;
const StyledEvaluateBtnsBox = styled.div`
  display: flex;
  button {
    font-size: 14px;
    &:first-child {
      margin-right: 5px;
    }
  }
`;

const StyledWord = styled.div`
  font-size: 30px;
  text-align: center;
`;

const StyledBottomBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledSpinnerBox = styled.div`
  flex: 1;
`;

const StyledSpinner = styled(Spinner)`
  font-size: 20px;
  margin: 5px;
`;

const StyledToggleBtn = styled(Button)`
  font-size: 16px;
`;

const StyledIdxBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;
