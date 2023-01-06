import { Fragment } from "react";
import WordListItem from "./WordListItem";
import { useWordbookSelector } from "../../context";
// import { useWordbookSelector } from "../../context";

import { Spinner } from "../../components/common/icons";
import styled from "styled-components";
import List from "../../components/common/Lists/List";
import { Devider } from "../common";
import WordItemSkeleton from "./WordItemSkeleton";
import { useEffect } from "react";
import { useWordbookDispatch } from "../../context/WordbookContext";
import { wordbookActionType as WAT } from "../../constants";

const WordList = ({ topicName, isNewItemLoading }) => {
  const { words, isLoading } = useWordbookSelector();
  // const { currentWords } = wordsData;
  const dispatch = useWordbookDispatch();
  const currentWords = words.filter((word) => word.topic === topicName);

  useEffect(() => {
    if (isLoading) return;
    dispatch({ type: WAT.GET_CURRENT_WORDS, payload: topicName });
  }, [isLoading, topicName, dispatch]);

  const listItems = currentWords.length ? (
    currentWords.map((word) => (
      <Fragment key={word._id}>
        <WordListItem wordID={word._id} wordData={word} />
        <Devider margin="10px 0" width="2px" color="#c4c4c4" />
      </Fragment>
    ))
  ) : (
    <div>단어를 추가하세요</div>
  );

  return (
    <StyledList>
      {isLoading && (
        <div className="list-spinner">
          <Spinner />
        </div>
      )}
      {!isLoading && listItems}
      {isNewItemLoading && (
        <>
          <WordItemSkeleton />
          <Devider margin="10px 0" width="2px" color="#c4c4c4" />
        </>
      )}
    </StyledList>
  );
};

export default WordList;

const StyledList = styled(List)`
  position: relative;
  margin-top: 25px;
  > .list-spinner {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 2.5rem;
  }
`;
