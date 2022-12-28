import React from "react";
import { useContext } from "react";
import { DataContext } from "../../services/DataContext";
import { Devider } from "../common";
import { Spinner } from "../common/icons";
import WordListItem from "../Words/WordListItem";

const BookmarkList = () => {
  const store = useContext(DataContext);
  const words = store.wordsData.words.filter((word) => word.isBookmarked === true);
  const isLoading = store.wordsData.loading;
  const listItem = words.length ? (
    words.map((word, idx) => (
      <>
        <WordListItem wordID={word._id} key={word._id} />
        {idx < words.length - 1 && <Devider margin="10px 0" width="2px" color="#c4c4c4" />}
      </>
    ))
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
