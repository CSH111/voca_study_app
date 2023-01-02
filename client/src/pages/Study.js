import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, PageContainer, Paper, PaperTitle } from "../components/common";
import { GoBackIcon, LeftIcon, RightIcon } from "../components/common/icons";
import { ConceptBox, NavBtnBox, WordItemBox } from "../components/Study";
import { useWordbook } from "../services/WordbookContext";

const Study = () => {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [studyConcept, setStudyConcept] = useState("");
  const {
    wordsData: { words: allWords },
    isDataInitiated,
  } = useWordbook();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const wordsInTopic =
      topic === "bookmark"
        ? allWords.filter((word) => word.isBookmarked)
        : allWords.filter((word) => word.topic === topic);
    if (count > 0) return;
    if (!isDataInitiated) {
      setStaticWordsData(wordsInTopic);
      return;
    }
    setCount((c) => c + 1);
    setStaticWordsData(wordsInTopic);
  }, [allWords]);

  const [staticWordsData, setStaticWordsData] = useState([]);
  const incompleteWords = staticWordsData.filter((word) => word.isMemorized === false);
  const wordsToStudy = (() => {
    switch (studyConcept) {
      case "all":
        return staticWordsData;
      case "incomplete":
        return incompleteWords;
      default:
        return [];
    }
  })();

  const handleBackBtnClick = () => {
    navigate("/topics");
  };

  const handleLeftBtnClick = () => {
    setCurrentIdx((idx) => {
      if (idx < 1) {
        return idx;
      }
      return idx - 1;
    });
  };

  const handleRightBtnClick = () => {
    setCurrentIdx((idx) => {
      if (idx > wordsToStudy.length - 2) {
        return idx;
      }
      return idx + 1;
    });
  };

  const handleAllBtnClick = () => {
    setStudyConcept("all");
  };
  const handleIncompleteBtnClick = () => {
    setStudyConcept("incomplete");
  };

  return (
    <PageContainer>
      <Paper
        width="500px"
        paperHeader={
          <>
            <PaperTitle>{topic}</PaperTitle>
            <Button onClick={handleBackBtnClick}>
              <GoBackIcon />
            </Button>
          </>
        }
      >
        {!studyConcept && (
          <ConceptBox>
            <Button
              themeColor="gray"
              onClick={handleAllBtnClick}
              disabled={staticWordsData.length === 0}
            >
              모든 단어({staticWordsData.length})
            </Button>
            <Button
              themeColor="gray"
              onClick={handleIncompleteBtnClick}
              disabled={incompleteWords.length === 0}
            >
              미학습 단어({incompleteWords.length})
            </Button>
          </ConceptBox>
        )}
        {studyConcept && (
          <>
            <WordItemBox
              staticWordData={wordsToStudy[currentIdx]}
              setStaticWordsData={setStaticWordsData}
              idx={currentIdx}
              total={wordsToStudy.length}
              goNext={handleRightBtnClick}
            />
            <NavBtnBox>
              <Button onClick={handleLeftBtnClick} disabled={currentIdx === 0}>
                <LeftIcon fontSize="35px" />
              </Button>
              <Button
                onClick={handleRightBtnClick}
                disabled={currentIdx === wordsToStudy.length - 1}
              >
                <RightIcon fontSize="35px" />
              </Button>
            </NavBtnBox>
          </>
        )}
      </Paper>
    </PageContainer>
  );
};

export default Study;
