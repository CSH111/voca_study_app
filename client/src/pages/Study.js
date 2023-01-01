import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, PageContainer, Paper, PaperTitle } from "../components/common";
import { GoBackIcon, LeftIcon, RightIcon } from "../components/common/icons";
import { NavBtnBox, WordItemBox } from "../components/Study";
import { useWordbook } from "../services/WordbookContext";

const Study = () => {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [currentIdx, setCurrentIdx] = useState(0);
  const {
    wordsData: { words: allWords },
  } = useWordbook();
  const words = allWords.filter((word) => word.topic === topic);

  const handleBackBtnClick = () => {
    navigate("/topics");
  };

  const handleLeftBtnClick = () => {
    setCurrentIdx((idx) => idx - 1);
  };
  const handleRightBtnClick = () => {
    setCurrentIdx((idx) => idx + 1);
  };

  return (
    <PageContainer>
      <Paper
        width="500px"
        paperHeader={
          <>
            <PaperTitle>학습하기</PaperTitle>
            <Button onClick={handleBackBtnClick}>
              <GoBackIcon />
            </Button>
          </>
        }
      >
        <>
          <WordItemBox wordData={words[currentIdx]} idx={currentIdx} total={words.length} />
          <NavBtnBox>
            <Button onClick={handleLeftBtnClick} disabled={currentIdx === 0}>
              <LeftIcon fontSize="35px" />
            </Button>
            <Button onClick={handleRightBtnClick} disabled={currentIdx === words.length - 1}>
              <RightIcon fontSize="35px" />
            </Button>
          </NavBtnBox>
        </>
      </Paper>
    </PageContainer>
  );
};

export default Study;
