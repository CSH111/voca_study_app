import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Button, LoadingCover, Paper, PaperTitle } from "../components/common";
import { GoBackIcon } from "../components/common/icons";
import { ConceptBox, StudyItemBox } from "../components/Study";
import { useWordbookSelector } from "../context";
import { makeSuffledArr } from "../utils";

const Study = () => {
  const navigate = useNavigate();
  const { topic } = useParams();
  const [currentIdx, setCurrentIdx] = useState(0);
  const { words: allWords, isLoading } = useWordbookSelector();
  const [staticWords, setStaticWords] = useState([]);
  const incompleteStaticWords = useMemo(() => {
    return staticWords.filter((word) => word.isMemorized === false);
  }, [staticWords]);

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
    const suffledTopicWords = makeSuffledArr(extractCurrentTopicWords());
    setStaticWords(suffledTopicWords);
  }, [concept, extractCurrentTopicWords]);

  const staticWordsInConcept = (() => {
    switch (concept) {
      case "all":
        return staticWords;
      case "incomplete":
        return incompleteStaticWords;
      default:
        return [];
    }
  })();

  const handleBackBtnClick = () => {
    navigate(concept ? `/test/${topic}` : "/topics");
  };

  const goNext = () => {
    setCurrentIdx((idx) => idx + 1);
  };

  const handleConceptBtnsClick = ({ target: { value } }) => {
    setSearchParams({ concept: value });
  };

  return (
    <Paper
      width="500px"
      small
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
              onClick={handleConceptBtnsClick}
              disabled={staticWords.length === 0}
              themeColor="primary"
              shadow={true}
              variant="contained"
            >
              모든 단어 ({staticWords.length})
            </Button>
            <Button
              value="incomplete"
              onClick={handleConceptBtnsClick}
              disabled={incompleteStaticWords.length === 0}
              themeColor="primary"
              shadow={true}
              variant="contained"
            >
              암기가 필요한 단어({incompleteStaticWords.length})
            </Button>
          </ConceptBox>
        </>
      )}
      {concept && (
        <>
          <StudyItemBox
            staticWordsInConcept={staticWordsInConcept}
            setStaticWords={setStaticWords}
            currentIdx={currentIdx}
            goNext={goNext}
          />
        </>
      )}
    </Paper>
  );
};

export default Study;
