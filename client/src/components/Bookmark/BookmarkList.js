import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { WordListItem } from "../Words/WordListItem";

const BookmarkList = () => {
  const store = useContext(DataContext);
  const words = store.words.filter((word) => word.isBookmarked === true);
  return (
    <>
      {words.length ? (
        words.map((word) => <WordListItem word={word} key={word._id} />)
      ) : (
        <div>단어를 추가하세요</div>
      )}
    </>
  );
};

export default BookmarkList;
