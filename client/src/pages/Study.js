import { useMemo } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, LoadingCover, PageContainer, Paper, PaperTitle } from "../components/common";
import { GoBackIcon, LeftIcon, RightIcon } from "../components/common/icons";
import { ConceptBox, NavBtnBox, WordItemBox } from "../components/Study";
import { useWordbookSelector } from "../context";
import { useInitialLoadEffect } from "../hooks";
// import { useWordbookSelector } from "../context";

const Study = () => {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [studyConcept, setStudyConcept] = useState("");
  const { words: allWords, initialLoad, isLoading } = useWordbookSelector();

  useInitialLoadEffect(
    () => {
      const currentTopicWords =
        topic === "bookmark"
          ? allWords.filter((word) => word.isBookmarked)
          : allWords.filter((word) => word.topic === topic);

      setStaticWordsData(currentTopicWords);
    },
    initialLoad,
    [allWords]
  );

  const [staticWordsData, setStaticWordsData] = useState([]);
  const incompleteWords = useMemo(() => {
    return staticWordsData.filter((word) => word.isMemorized === false);
  }, [staticWordsData]);

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

  const handleConceptBtnsClick = ({ target: { value } }) => {
    setStudyConcept(value);
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
          <>
            {isLoading && <LoadingCover />}
            <ConceptBox>
              <Button
                value="all"
                themeColor="gray"
                onClick={handleConceptBtnsClick}
                disabled={staticWordsData.length === 0}
              >
                모든 단어 ({staticWordsData.length})
              </Button>
              <Button
                value="incomplete"
                themeColor="gray"
                onClick={handleConceptBtnsClick}
                disabled={incompleteWords.length === 0}
              >
                미학습 단어({incompleteWords.length})
              </Button>
            </ConceptBox>
          </>
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
