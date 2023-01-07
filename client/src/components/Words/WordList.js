import { Fragment } from "react";
import WordListItem from "./WordListItem";
import { useWordbookSelector, useWordbookDispatch } from "../../context";
// import { useWordbookSelector } from "../../context";
import { Spinner } from "../../components/common/icons";
import List from "../../components/common/Lists/List";
import { Devider, EmptyMsgBox } from "../common";
import WordItemSkeleton from "./WordItemSkeleton";
import { useEffect } from "react";
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
    <EmptyMsgBox>학습할 단어를 추가하세요.</EmptyMsgBox>
  );

  return (
    <List>
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
    </List>
  );
};

export default WordList;
