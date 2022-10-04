import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Spinner from "../common/Spinner";
import { WordListItem } from "../Words/WordListItem";

const BookmarkList = () => {
  const store = useContext(DataContext);
  const words = store.wordsData.words.filter(
    (word) => word.isBookmarked === true
  );
  const isLoading = store.wordsData.loading;
  const listItem = words.length ? (
    words.map((word) => <WordListItem wordID={word._id} key={word._id} />)
  ) : (
    <div>단어를 추가하세요</div>
  );
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && listItem}
    </>
  );
};

export default BookmarkList;
