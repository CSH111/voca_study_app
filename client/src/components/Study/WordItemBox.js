import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { BookmarkButton, Button } from "../common";
import { StarIcon } from "../common/icons";

const WordItemBox = ({ wordData = {}, idx, total }) => {
  const { word, meaning, isBookmarked } = wordData;
  const [isMeaningShown, setIsMeaningShown] = useState(false);

  useEffect(() => {
    setIsMeaningShown(false);
  }, [wordData]);

  const handleMeaningBtn = () => {
    setIsMeaningShown((state) => !state);
  };
  return (
    <StyledBox>
      <StyledWord>{isMeaningShown ? meaning : word}</StyledWord>
      <StyledToggleBtn onClick={handleMeaningBtn}>
        {isMeaningShown ? "단어 보기" : "뜻 보기"}
      </StyledToggleBtn>
      {/* <BookmarkButton isBookmarked={isBookmarked}>
        <StarIcon />
      </BookmarkButton> */}
      {/* {String(isBookmarked)} */}
      <StyledIdxBox>
        {idx + 1} / {total}
      </StyledIdxBox>
    </StyledBox>
  );
};

export default WordItemBox;

const StyledBox = styled.div`
  /* border: solid 1px black; */
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
  /* font-weight: bold; */
`;
