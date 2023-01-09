import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useModal } from "../../context";
import { usePatchWord } from "../../hooks";
import { BookmarkButton, Button } from "../common";
import { StarIcon } from "../common/icons";
import Modal from "../common/Modal";
//TODO: 순서 섞기, 넘김 이펙트, 결과 페이지
const StudyItemBox = ({ staticWord = {}, idx, total, goNext, setStaticWordsData }) => {
  const navigate = useNavigate();
  const { topic } = useParams();
  const { word, meaning, isBookmarked, _id: id } = staticWord;
  const [isMeaningShown, setIsMeaningShown] = useState(false);
  const { openModal } = useModal();
  const { patchWord } = usePatchWord();
  const isLastWord = idx + 1 === total;

  useEffect(() => {
    setIsMeaningShown(false);
  }, [staticWord]);

  const handleMeaningBtn = () => {
    setIsMeaningShown((state) => !state);
  };

  const handleEvaluation = async ({ target: { value } }) => {
    await patchWord(id, { ...staticWord, isMemorized: JSON.parse(value) });

    if (isLastWord) {
      showEndModal();
      return;
    }
    goNext();
  };

  const handleBookmark = async () => {
    patchWord(id, { ...staticWord, isBookmarked: !staticWord.isBookmarked });
    setStaticWordsData((words) => {
      return words.map((word) => {
        return word._id === id ? { ...word, isBookmarked: !word.isBookmarked } : word;
      });
    });
  };

  const handleEndModalClose = () => {
    navigate(`/test/${topic}`);
  };

  const showEndModal = () => {
    openModal(<Modal onClose={handleEndModalClose}>학습이 끝났습니다.</Modal>);
  };

  return (
    <StyledBox>
      <StyledBookmarkBtn onClick={handleBookmark} isBookmarked={isBookmarked}>
        <StarIcon />
      </StyledBookmarkBtn>
      {isMeaningShown && (
        <StyledEvaluateBtnsBox>
          <EasyBtn themeColor="green" onClick={handleEvaluation} value="true">
            쉬움
            <br />
            (학습완료)
          </EasyBtn>
          <HardBtn themeColor="red" onClick={handleEvaluation} value="false">
            어려움
            <br />
            (추가학습)
          </HardBtn>
        </StyledEvaluateBtnsBox>
      )}
      <StyledWord>{isMeaningShown ? meaning : word}</StyledWord>
      <StyledToggleBtn onClick={handleMeaningBtn} themeColor="gray">
        {isMeaningShown ? "단어 보기" : "정답 확인"}
      </StyledToggleBtn>
      <StyledIdxBox>
        {idx + 1} / {total}
      </StyledIdxBox>
    </StyledBox>
  );
};

export default StudyItemBox;

const StyledBox = styled.div`
  border-radius: 15px;
  box-shadow: inset 0 0 5px black;

  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledToggleBtn = styled(Button)`
  position: absolute;
  font-size: 16px;
  bottom: 0;
  margin: 20px;
  box-shadow: 2px 2px 2px 2px gray;
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
const EasyBtn = styled(Button)``;
const HardBtn = styled(Button)``;

const StyledBookmarkBtn = styled(BookmarkButton)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 15px;
`;
