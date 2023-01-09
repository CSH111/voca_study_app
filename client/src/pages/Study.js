import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button, LoadingCover, Paper, PaperTitle } from "../components/common";
import { GoBackIcon } from "../components/common/icons";
import { ConceptBox, StudyItemBox } from "../components/Study";
import { useWordbookSelector } from "../context";

const Study = () => {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [currentIdx, setCurrentIdx] = useState(0);
  const { words: allWords, isLoading } = useWordbookSelector();
  const [staticWordsData, setStaticWordsData] = useState([]);
  const incompleteWords = useMemo(() => {
    return staticWordsData.filter((word) => word.isMemorized === false);
  }, [staticWordsData]);

  const [searchParams, setSearchParams] = useSearchParams();
  const concept = searchParams.get("concept");

  const extractCurrentTopicWords = useCallback(() => {
    return topic === "bookmark"
      ? allWords.filter((word) => word.isBookmarked)
      : allWords.filter((word) => word.topic === topic);
  }, [allWords, topic]);

  useEffect(() => {
    if (concept) return;
    setCurrentIdx(0);
    setStaticWordsData(extractCurrentTopicWords());
  }, [concept, extractCurrentTopicWords]);

  const wordsToStudy = (() => {
    switch (concept) {
      case "all":
        return staticWordsData;
      case "incomplete":
        return incompleteWords;
      default:
        return [];
    }
  })();

  const handleBackBtnClick = () => {
    navigate(concept ? `/test/${topic}` : "/topics");
  };

  const goNext = () => {
    setCurrentIdx((idx) => (idx > wordsToStudy.length - 2 ? idx : idx + 1));
  };

  const handleConceptBtnsClick = ({ target: { value } }) => {
    setSearchParams({ concept: value });
  };

  return (
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
      {!concept && (
        <>
          {isLoading && <LoadingCover />}
          <ConceptBox onLoad={() => console.log("loaded")}>
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
              암기가 필요한 단어({incompleteWords.length})
            </Button>
          </ConceptBox>
        </>
      )}
      {concept && (
        <>
          <StudyItemBox
            staticWord={wordsToStudy[currentIdx]}
            setStaticWordsData={setStaticWordsData}
            idx={currentIdx}
            setCurrentIdx={setCurrentIdx}
            total={wordsToStudy.length}
            goNext={goNext}
          />
        </>
      )}
    </Paper>
  );
};

export default Study;
