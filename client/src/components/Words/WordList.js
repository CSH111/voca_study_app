import { Fragment, useEffect, useRef } from "react";

import { Spinner } from "../../components/common/icons";
import { wordbookActionType as WAT } from "../../constants";
import { useWordbookDispatch, useWordbookSelector } from "../../context";
import { Devider, EmptyMsgBox, List } from "../common";
import { WordItemSkeleton, WordListItem } from ".";

const WordList = ({ topicName, isNewItemLoading }) => {
  const { words, isLoading } = useWordbookSelector();
  const dispatch = useWordbookDispatch();
  const listRef = useRef();

  const currentWords = words.filter((word) => word.topic === topicName);

  useEffect(() => {
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [isNewItemLoading]);

  useEffect(() => {
    if (isLoading) return;
    dispatch({ type: WAT.GET_CURRENT_WORDS, payload: topicName });
  }, [isLoading, topicName, dispatch]);

  const listItems = currentWords.length
    ? currentWords.map((word) => (
        <Fragment key={word._id}>
          <WordListItem wordID={word._id} wordData={word} />
          <Devider margin="10px 0" width="1px" themeColor={{ color: "gray", level: "main" }} />
        </Fragment>
      ))
    : !isNewItemLoading && <EmptyMsgBox>생성된 단어가 없습니다.</EmptyMsgBox>;

  return (
    <List ref={listRef}>
      {isLoading && (
        <div className="list-spinner">
          <Spinner />
        </div>
      )}
      {!isLoading && listItems}
      {isNewItemLoading && (
        <>
          <WordItemSkeleton />
          <Devider margin="10px 0" width="1px" themeColor={{ color: "gray", level: "main" }} />
        </>
      )}
    </List>
  );
};

export default WordList;
