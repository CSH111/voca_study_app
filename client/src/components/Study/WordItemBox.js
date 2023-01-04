import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useWordbookContext } from "../../context/WordbookContext";
import { wordbookService } from "../../services";
import { BookmarkButton, Button } from "../common";
import { StarIcon } from "../common/icons";

const WordItemBox = ({ staticWordData = {}, idx, total, goNext, setStaticWordsData }) => {
  const { word, meaning, isBookmarked, _id: id } = staticWordData;
  const [isMeaningShown, setIsMeaningShown] = useState(false);
  const { setWordsData } = useWordbookContext();

  useEffect(() => {
    setIsMeaningShown(false);
  }, [staticWordData]);

  const handleMeaningBtn = () => {
    setIsMeaningShown((state) => !state);
  };

  const handleEvaluation = ({ target: { value } }) => {
    patchWord({ isMemorized: value });

    setWordsData(({ words, loading }) => {
      return {
        words: words.map((word) => {
          if (word._id === id) {
            return { ...word, isMemorized: JSON.parse(value) };
          }
          return word;
        }),
        loading,
      };
    });
    goNext();
  };

  const patchWord = async (changedDataObj) => {
    const body = {
      ...staticWordData,
      ...changedDataObj,
    };
    await wordbookService.patchWord(id, body);
    //
  };

  const handleBookmark = async () => {
    await patchWord({ isBookmarked: !staticWordData.isBookmarked });

    setWordsData(({ words, loading }) => {
      return {
        words: words.map((word) => {
          if (word._id === id) {
            return { ...word, isBookmarked: !word.isBookmarked };
          }
          return word;
        }),
        loading,
      };
    });

    setStaticWordsData((words) => {
      return words.map((word) => {
        if (word._id === id) {
          return { ...word, isBookmarked: !word.isBookmarked };
        }
        return word;
      });
    });
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
        {isMeaningShown ? "단어 보기" : "뜻 보기"}
      </StyledToggleBtn>
      <StyledIdxBox>
        {idx + 1} / {total}
      </StyledIdxBox>
    </StyledBox>
  );
};

export default WordItemBox;

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
